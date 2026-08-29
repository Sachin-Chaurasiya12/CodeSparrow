import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useCallback, useEffect } from "react";
import { FILE_CONFIG } from "./fileTypeConfig";

const REQUEST_TIMEOUT = 30000;

function NewSnippetPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [titleId, setTitleId] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [charCount, setCharCount] = useState(0);

  const fileInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Fetch snippet data if editing
  useEffect(() => {
    if (!isEditMode) return;

    const fetchSnippet = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`/inventory/snippet/${id}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        });

        if (!response.ok) {
          throw new Error("Failed to load snippet");
        }

        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
        setCharCount(data.content.length);
        setTitleId(data.id);
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate("/Inventory"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id, isEditMode, navigate]);

  const gradientBtn = {
    background: "linear-gradient(90deg, #5B6EE8 0%, #7B4FDB 100%)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    fontFamily: "'Inter', sans-serif",
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const extractTextFromFile = async (file) => {
    try {
      if (FILE_CONFIG.isTextFile(file)) {
        const text = await file.text();
        setContent((prev) => (prev ? prev + "\n\n" + text : text));
        return true;
      }

      if (FILE_CONFIG.isDocxFile(file)) {
        try {
          const { default: JSZip } = await import("jszip");
          const zip = new JSZip();
          const zipContent = await zip.loadAsync(file);
          const xmlFile = zipContent.file("word/document.xml");

          if (xmlFile) {
            const xmlText = await xmlFile.async("string");
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            const textElements = xmlDoc.getElementsByTagName("w:t");
            let extractedText = "";

            for (let i = 0; i < textElements.length; i++) {
              extractedText += textElements[i].textContent;
            }

            if (extractedText) {
              setContent((prev) => (prev ? prev + "\n\n" + extractedText : extractedText));
              return true;
            }
          }
        } catch (docxError) {
          console.error("Failed to extract DOCX text:", docxError);
          setError("Could not extract text from DOCX file");
          return false;
        }
      }

      return false;
    } catch (err) {
      console.error("Error extracting text:", err);
      setError(`Failed to extract text from ${file.name}`);
      return false;
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (!files) return;

    const next = [];
    const errors = [];
    const textExtractionPromises = [];

    if (attachments.length >= FILE_CONFIG.MAX_ATTACHMENTS) {
      errors.push(`Maximum ${FILE_CONFIG.MAX_ATTACHMENTS} attachments allowed`);
    }

    Array.from(files).forEach((file) => {
      if (file.size > FILE_CONFIG.MAX_FILE_SIZE) {
        errors.push(`${file.name}: File size exceeds 10MB limit`);
        return;
      }

      if (FILE_CONFIG.isTextFile(file) || FILE_CONFIG.isDocxFile(file)) {
        textExtractionPromises.push(extractTextFromFile(file));
        return;
      }

      if (!FILE_CONFIG.isAllowedAttachment(file)) {
        errors.push(
          `${file.name}: File type not supported. Supported: ${FILE_CONFIG.getSupportedFormats()}`
        );
        return;
      }

      const isImage = file.type.startsWith("image/");

      if (isImage) {
        const currentImageCount = attachments.filter((a) => a.isImage).length +
          next.filter((a) => a.isImage).length;

        if (currentImageCount >= 2) {
          errors.push(`${file.name}: Maximum 2 images allowed`);
          return;
        }
      }

      const url = URL.createObjectURL(file);

      next.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        url,
        size: file.size,
        isImage,
        file,
      });
    });

    if (errors.length > 0) {
      setError(errors.join("\n"));
      return;
    }

    if (next.length + attachments.length > FILE_CONFIG.MAX_ATTACHMENTS) {
      setError(
        `Cannot add more than ${FILE_CONFIG.MAX_ATTACHMENTS} attachments total`
      );
      return;
    }

    Promise.all(textExtractionPromises).then(() => {
      setAttachments((prev) => {
        if (prev.length + next.length > FILE_CONFIG.MAX_ATTACHMENTS) {
          setError(`Maximum ${FILE_CONFIG.MAX_ATTACHMENTS} attachments allowed`);
          return prev;
        }
        return [...prev, ...next];
      });

      setError(null);
    });

    e.target.value = "";
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);

      if (target) {
        URL.revokeObjectURL(target.url);
      }

      return prev.filter((a) => a.id !== id);
    });
  };

  const validateSnippet = useCallback(() => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Title is required");
      return null;
    }

    if (trimmedTitle.length > 255) {
      setError("Title must be less than 255 characters");
      return null;
    }

    if (content.length > 150000) {
      setError("Content must be less than 150,000 characters");
      return null;
    }

    return {
      title: trimmedTitle,
      content: content.trim(),
    };
  }, [title, content]);

  const uploadImage = useCallback(async (file, slot, tId) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Please login again");
    }

    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("file", file);
    formData.append("titleid", tId);

    const endpoint = slot === 0 ? "/inventory/uploadImage1" : "/inventory/uploadImage2";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Image upload failed: ${res.status}`);
    }

    return data;
  }, []);

  const handleConfirmSave = useCallback(async () => {
    const snippetData = validateSnippet();

    if (!snippetData) {
      return;
    }

    setSaving(true);
    setError(null);

    abortControllerRef.current = new AbortController();
    const timeoutId = setTimeout(
      () => abortControllerRef.current?.abort(),
      REQUEST_TIMEOUT
    );

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Please login again");
      }

      const endpoint = isEditMode ? "/inventory/update/" : "/inventory/createnew";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(snippetData),
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 409 || errorData.message?.toLowerCase().includes('already exist')) {
          throw new Error("Title already exists. Please use a different title.");
        }
        
        throw new Error(
          errorData.message || `Failed to save content: ${response.status}`
        );
      }

      const responseData = await response.json();
      const createdTitleId = responseData.title_id || titleId;

      if (!createdTitleId) {
        throw new Error("No title ID returned from server");
      }

      setTitleId(createdTitleId);

      const imageAttachments = attachments.filter((a) => a.isImage && a.file);

      for (let i = 0; i < imageAttachments.length && i < 2; i++) {
        await uploadImage(imageAttachments[i].file, i, createdTitleId);
      }

      setShowSaveModal(false);
      setTitle("");
      setContent("");
      setAttachments([]);
      setTitleId(null);
      setError(null);

      navigate("/Inventory");
    } catch (err) {
      clearTimeout(timeoutId);

      if (err.name === "AbortError") {
        setError("Request timeout. Please try again.");
      } else {
        console.error("Error saving content:", err);
        setError(err.message || "Failed to save content. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }, [validateSnippet, attachments, uploadImage, navigate, isEditMode, titleId]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ color: "#6a6a6a", fontSize: "15px" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "2.5rem 3rem",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >

        {error && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "white",
              border: "1px solid #feb2b2",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#c53030",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 150,
              maxWidth: "320px",
              animation: "slideIn 0.3s ease",
            }}
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              style={{
                background: "transparent",
                border: "none",
                color: "#c53030",
                cursor: "pointer",
                fontSize: "18px",
                padding: "0",
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "1rem",
            borderBottom: "2px solid #1a1a1a",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <i
              className="bi bi-box-seam"
              style={{
                fontSize: "30px",
                color: "#1a1a1a",
              }}
            />

            <h1
              style={{
                fontSize: "26px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
                margin: 0,
                color: "#1a1a1a",
              }}
            >
              Inventory
            </h1>
          </div>

          <button
            onClick={() => navigate("/Inventory")}
            aria-label="Back to inventory"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#7B4FDB",
              fontSize: "24px",
              padding: "5px",
            }}
          >
            <i className="bi bi-arrow-left-circle" />
          </button>
        </div>

        <div
          style={{
            border: "1px solid #cfcfcf",
            borderRadius: "14px",
            padding: "1.5rem 1.5rem 2rem",
            backgroundColor: "#fdfdfd",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "1rem",
              marginBottom: "1.5rem",
              borderBottom: "1px solid #c9c9c9",
              gap: "20px",
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "28px",
                  backgroundColor: "#7B4FDB",
                  borderRadius: "2px",
                }}
              />

              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#1a1a1a",
                }}
              >
                {isEditMode ? "Edit" : "Create New"}
              </h2>
            </div>

            <button
              onClick={handleUploadClick}
              style={gradientBtn}
            >
              <i className="bi bi-plus-lg" />
              Upload
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              style={{
                display: "none",
              }}
            />

          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              position: "relative"
            }}
          >
            <div
              style={{
                width: "4px",
                minHeight: "30px",
                backgroundColor: "#7B4FDB",
                borderRadius: "2px",
                marginTop: "5px",
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1, position: "relative" }}>
              <textarea
                value={content}
                onChange={(e) => {
                  const newContent = e.target.value;
                  if (newContent.length <= 150000) {
                    setContent(newContent);
                    setCharCount(newContent.length);
                  }
                }}
                placeholder="Write Content here..."
                style={{
                  flex: 1,
                  width: "100%",
                  minHeight: "620px",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  background: "transparent",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: "1.5",
                  padding: "4px 0",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "15px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: charCount > 140000 ? "#d64545" : "#9a9a9a"
                }}
              >
                {150000 - charCount} / 150000
              </div>
            </div>
          </div>

          {attachments.length > 0 && (

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >

              {attachments.map((a) => (

                <div
                  key={a.id}
                  style={{
                    border:
                      "1px solid #ededed",
                    borderRadius: "12px",
                    padding: "8px",
                    background: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    maxWidth: "260px",
                  }}
                >

                  {a.isImage ? (

                    <img
                      src={a.url}
                      alt={a.name}
                      onClick={() =>
                        setPreviewImage(a)
                      }
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        e.target.style.transform =
                          "scale(1.05)"
                      }
                      onMouseLeave={(e) =>
                        e.target.style.transform =
                          "scale(1)"
                      }
                    />

                  ) : (

                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        background: "#ede9fe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7B4FDB",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className="bi bi-file-earmark"
                        style={{
                          fontSize: "24px",
                        }}
                      />
                    </div>

                  )}

                  <div
                    style={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >

                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        overflow: "hidden",
                        textOverflow:
                          "ellipsis",
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {a.name}
                    </div>

                    <button
                      onClick={() =>
                        removeAttachment(a.id)
                      }
                      style={{
                        background:
                          "transparent",
                        border: "none",
                        color: "#ef4444",
                        fontSize: "12px",
                        padding: 0,
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >

            <button
              onClick={() =>
                setShowSaveModal(true)
              }
              disabled={saving}
              style={{
                ...gradientBtn,
                padding: "12px 36px",
                fontSize: "17px",
                fontWeight: "800",
                opacity: saving ? 0.6 : 1,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>

          </div>

        </div>

      </div>

      {showSaveModal && !isEditMode && (

        <div
          role="dialog"
          aria-modal="true"
          onClick={() =>
            setShowSaveModal(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 15, 25, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "16px",
          }}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "28px",
              width: "100%",
              maxWidth: "420px",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.2)",
              fontFamily:
                "'Inter', sans-serif",
              boxSizing: "border-box",
            }}
          >

            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
                fontWeight: "800",
                color: "#1a1a1a",
              }}
            >
              Save Snippet
            </h3>

            <p
              style={{
                margin: "0 0 16px",
                color: "#666",
                fontSize: "14px",
              }}
            >
              Enter a title for your snippet.
            </p>

            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Snippet title"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleConfirmSave()
              }
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "30px",
                border:
                  "1px solid #d9d9d9",
                outline: "none",
                fontSize: "15px",
                fontFamily:
                  "'Inter', sans-serif",
                marginBottom: "20px",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >

              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setTitle("");
                }}
                style={{
                  padding: "10px 22px",
                  borderRadius: "30px",
                  border:
                    "2px solid #1a1a1a",
                  background: "white",
                  color: "#1a1a1a",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontFamily:
                    "'Inter', sans-serif",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSave}
                disabled={!title.trim() || saving}
                style={{
                  ...gradientBtn,
                  padding: "10px 26px",
                  opacity:
                    (title.trim() && !saving) ? 1 : 0.6,
                  cursor:
                    (title.trim() && !saving)
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {saving ? "Saving..." : "Save"}
              </button>

            </div>

          </div>

        </div>

      )}

      {isEditMode && showSaveModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowSaveModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 15, 25, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "28px",
              width: "100%",
              maxWidth: "420px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              fontFamily: "'Inter', sans-serif",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
                fontWeight: "800",
                color: "#1a1a1a",
              }}
            >
              Confirm Update
            </h3>

            <p
              style={{
                margin: "0 0 20px",
                color: "#666",
                fontSize: "14px",
              }}
            >
              Update "{title}"?
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowSaveModal(false)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "30px",
                  border: "2px solid #1a1a1a",
                  background: "white",
                  color: "#1a1a1a",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSave}
                disabled={saving}
                style={{
                  ...gradientBtn,
                  padding: "10px 26px",
                  opacity: saving ? 0.6 : 1,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewImage && (

        <div
          role="dialog"
          aria-modal="true"
          onClick={() =>
            setPreviewImage(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 15, 25, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "16px",
          }}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              position: "relative",
              display: "inline-block",
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow:
                "0 25px 50px rgba(0,0,0,0.3)",
              lineHeight: 0,
            }}
          >

            <img
              src={previewImage.url}
              alt={previewImage.name}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                display: "block",
              }}
            />

            <button
              onClick={() =>
                setPreviewImage(null)
              }
              aria-label="Close preview"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background:
                  "rgba(0,0,0,0.6)",
                border: "none",
                color: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                transition:
                  "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                e.target.style.background =
                  "rgba(0,0,0,0.8)"
              }
              onMouseLeave={(e) =>
                e.target.style.background =
                  "rgba(0,0,0,0.6)"
              }
            >
              <i className="bi bi-x-lg" />
            </button>

          </div>

        </div>

      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default NewSnippetPage;