import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function NewSnippetPage() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const fileInputRef = useRef(null);

  // -----------------------------
  // Button style
  // -----------------------------
  const gradientBtn = (key) => ({
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

    transform:
      hoveredBtn === key
        ? "translateY(-2px)"
        : "translateY(0)",

    boxShadow:
      hoveredBtn === key
        ? "0 8px 18px rgba(123, 79, 219, 0.35)"
        : "0 4px 10px rgba(123, 79, 219, 0.2)",

    transition:
      "transform 0.25s ease, box-shadow 0.25s ease",

    fontFamily: "'Inter', sans-serif",
  });

  // -----------------------------
  // Upload
  // -----------------------------
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (!files) return;

    const next = [];

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);

      next.push({
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        type: file.type,
        url,
        isImage: file.type.startsWith("image/"),
      });
    });

    setAttachments((prev) => [...prev, ...next]);

    // Allow selecting same file again
    e.target.value = "";
  };

  // -----------------------------
  // Remove attachment
  // -----------------------------
  const removeAttachment = (id) => {
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);

      if (target) {
        URL.revokeObjectURL(target.url);
      }

      return prev.filter((a) => a.id !== id);
    });
  };

  // -----------------------------
  // Download
  // -----------------------------
  const downloadAs = (format) => {
    const safeTitle = (title || "untitled")
      .replace(/[^a-z0-9-_]+/gi, "_");

    if (format === "txt") {
      const blob = new Blob(
        [content],
        {
          type: "text/plain;charset=utf-8",
        }
      );

      triggerDownload(
        blob,
        `${safeTitle}.txt`
      );
    } else {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${safeTitle}</title>
        </head>
        <body>
          <pre style="
            font-family: Inter, sans-serif;
            white-space: pre-wrap;
          ">${escapeHtml(content)}</pre>
        </body>
        </html>
      `;

      const blob = new Blob(
        [html],
        {
          type: "application/msword",
        }
      );

      triggerDownload(
        blob,
        `${safeTitle}.doc`
      );
    }

    setShowDownloadMenu(false);
  };

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const escapeHtml = (s) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // -----------------------------
  // Save
  // -----------------------------
  const handleConfirmSave = () => {
    if (!title.trim()) return;

    // Later you can send:
    // title
    // content
    // attachments
    // to your backend here.

    setShowSaveModal(false);
    setTitle("");

    // React Router DOM syntax
    navigate("/Inventory");
  };

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

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

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

          {/* Back button */}
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


        {/* ========================= */}
        {/* Main Card */}
        {/* ========================= */}

        <div
          style={{
            border: "1px solid #cfcfcf",
            borderRadius: "14px",
            padding: "1.5rem 1.5rem 2rem",
            backgroundColor: "#fdfdfd",
          }}
        >

          {/* ========================= */}
          {/* Card Header */}
          {/* ========================= */}

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
                Create New
              </h2>
            </div>


            {/* Action buttons */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >

              {/* Upload */}

              <button
                onClick={handleUploadClick}
                onMouseEnter={() =>
                  setHoveredBtn("upload")
                }
                onMouseLeave={() =>
                  setHoveredBtn(null)
                }
                style={gradientBtn("upload")}
              >
                <i className="bi bi-plus-lg" />
                Upload
              </button>


              {/* Download */}

              <div
                style={{
                  position: "relative",
                }}
              >
                <button
                  onClick={() =>
                    setShowDownloadMenu(
                      (s) => !s
                    )
                  }
                  onMouseEnter={() =>
                    setHoveredBtn("download")
                  }
                  onMouseLeave={() =>
                    setHoveredBtn(null)
                  }
                  style={gradientBtn("download")}
                >
                  <i className="bi bi-download" />
                  Download
                </button>


                {/* Download menu */}

                {showDownloadMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "white",
                      border: "1px solid #e5e5e5",
                      borderRadius: "12px",
                      boxShadow:
                        "0 8px 24px rgba(0,0,0,0.08)",
                      overflow: "hidden",
                      zIndex: 10,
                      minWidth: "160px",
                    }}
                  >

                    <button
                      onClick={() =>
                        downloadAs("txt")
                      }
                      style={menuItemStyle}
                    >
                      As .txt
                    </button>

                    <button
                      onClick={() =>
                        downloadAs("doc")
                      }
                      style={menuItemStyle}
                    >
                      As .doc
                    </button>

                  </div>
                )}
              </div>


              {/* Hidden file input */}

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
          </div>


          {/* ========================= */}
          {/* Workspace */}
          {/* ========================= */}

          <div
            style={{
              position: "relative",
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
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

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder="Write Content here..."
                style={{
                  flex: 1,
                  width: "100%",
                  minHeight: "420px",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  background: "transparent",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  fontFamily:
                    "'Inter', sans-serif",
                  lineHeight: "1.5",
                  padding: "4px 0",
                  boxSizing: "border-box",
                }}
              />

            </div>


            {/* ========================= */}
            {/* Attachments */}
            {/* ========================= */}

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
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
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

          </div>


          {/* ========================= */}
          {/* Save Button */}
          {/* ========================= */}

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
              onMouseEnter={() =>
                setHoveredBtn("save")
              }
              onMouseLeave={() =>
                setHoveredBtn(null)
              }
              style={{
                ...gradientBtn("save"),
                padding: "12px 36px",
                fontSize: "17px",
                fontWeight: "800",
              }}
            >
              Save
            </button>

          </div>

        </div>

      </div>


      {/* ========================= */}
      {/* Save Modal */}
      {/* ========================= */}

      {showSaveModal && (

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
                disabled={!title.trim()}
                style={{
                  ...gradientBtn(
                    "modalSave"
                  ),
                  padding: "10px 26px",
                  opacity:
                    title.trim() ? 1 : 0.6,
                  cursor:
                    title.trim()
                      ? "pointer"
                      : "not-allowed",
                }}
                onMouseEnter={() =>
                  setHoveredBtn(
                    "modalSave"
                  )
                }
                onMouseLeave={() =>
                  setHoveredBtn(null)
                }
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


const menuItemStyle = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "10px 14px",
  background: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  color: "#1a1a1a",
  fontFamily: "'Inter', sans-serif",
};


export default NewSnippetPage;