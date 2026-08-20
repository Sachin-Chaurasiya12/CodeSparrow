import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import noResultsImg from './assets/nothing-found-illustration-svg-download-png-2815869.webp';

const API_BASE_URL = "http://localhost:8084";
const PAGE_SIZE = 15;

export default function InventoryPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [scrollThumbTop, setScrollThumbTop] = useState(0);
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [isCreateHovered, setIsCreateHovered] = useState(false);
  const [hoveredPage, setHoveredPage] = useState(null);
  const [hoveredArrow, setHoveredArrow] = useState(null);

  const [snippets, setSnippets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        searchInputRef.current?.blur();
        setIsSearchFocused(false);
        setIsSearchHovered(false);
        setSearchText('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debounce search input
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  // Fetch snippets from backend whenever page or search term changes
  useEffect(() => {
    const controller = new AbortController();

    const fetchSnippets = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(currentPage - 1),
          size: String(PAGE_SIZE),
          sortBy: 'title'
        });
        if (debouncedSearch) {
          params.append('searchTerm', debouncedSearch);
        }

        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/inventory/snippets?${params.toString()}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to load snippets (${response.status})`);
        }

        const data = await response.json();
        setSnippets(data.content ?? []);
        setTotalPages(data.totalPages > 0 ? data.totalPages : 1);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setSnippets([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
    return () => controller.abort();
  }, [currentPage, debouncedSearch]);

  // Update scrollbar position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const track = scrollTrackRef.current;
      if (!track) return;

      const trackHeight = track.clientHeight;
      const thumbHeight = 90;
      const maxThumbTop = trackHeight - thumbHeight;

      const scrollHeight = container.scrollHeight - container.clientHeight;
      if (scrollHeight <= 0) {
        setScrollThumbTop(0);
        return;
      }

      const scrollPercentage = container.scrollTop / scrollHeight;
      setScrollThumbTop(Math.max(0, Math.min(scrollPercentage * maxThumbTop, maxThumbTop)));
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [snippets]);

  // Handle scrollbar thumb drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingScrollbar || !scrollTrackRef.current || !scrollContainerRef.current) return;

      const track = scrollTrackRef.current;
      const container = scrollContainerRef.current;
      const thumbHeight = 90;
      const rect = track.getBoundingClientRect();
      const maxThumbTop = rect.height - thumbHeight;
      const newTop = Math.max(0, Math.min(e.clientY - rect.top - thumbHeight / 2, maxThumbTop));

      setScrollThumbTop(newTop);

      const scrollPercentage = maxThumbTop > 0 ? newTop / maxThumbTop : 0;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      container.scrollTop = scrollPercentage * scrollHeight;
    };

    const handleMouseUp = () => {
      setIsDraggingScrollbar(false);
    };

    if (isDraggingScrollbar) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingScrollbar]);

  const displayedSnippets = sortAscending ? snippets : [...snippets].reverse();

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Build a windowed list of page numbers around the current page
  const getPageNumbers = () => {
    const maxVisible = isMobile ? 3 : 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  };

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/inventory/deletesnippet?id=${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || `Failed to delete snippet (${response.status})`);
      }

      setSnippets((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div style={{
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  padding: isMobile ? '1.5rem 1rem' : '2.5rem 3rem',
  fontFamily: "'Inter', sans-serif"
}}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
      
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: isMobile ? '0.75rem' : '1rem',
          borderBottom: '2px solid #1a1a1a',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          flexWrap: 'wrap',
          gap: isMobile ? '0.5rem' : '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '10px' }}>
            <i className="bi bi-box-seam" style={{
              fontSize: isMobile ? '24px' : '30px',
              color: '#1a1a1a'
            }}></i>
            <h1 style={{
  fontSize: isMobile ? '20px' : '26px',
  fontWeight: '800',
  letterSpacing: '-0.5px',
  margin: 0,
  color: '#1a1a1a'
}}>
  Inventory
</h1>
          </div>
          <i className="bi bi-balloon" style={{
            fontSize: isMobile ? '20px' : '26px',
            color: '#7B2FBE'
          }}></i>
        </div>

        {/* Top Bar */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          marginBottom: isMobile ? '1rem' : '1.5rem',
          gap: isMobile ? '1rem' : '1rem'
        }}>
          <button
  style={{
    background: 'linear-gradient(90deg, #5B6EE8 0%, #7B4FDB 100%)',
    color: 'white',
    border: 'none',
    padding: isMobile ? '12px 20px' : '14px 32px',
    borderRadius: '30px',
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: '800',
    cursor: 'pointer',
    
    // Shadow behind the button
boxShadow: '0 6px 15px rgba(123, 79, 219, 0.35)',
    whiteSpace: 'nowrap'
  }}
>
  #My Snippets
</button>

<div
  ref={searchContainerRef}
  onMouseEnter={() => setIsSearchHovered(true)}
  onMouseLeave={() => setIsSearchHovered(false)}
  onClick={() => {
    setIsSearchFocused(true);
    searchInputRef.current?.focus();
  }}
  style={{
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: '30px',

    border:
      isSearchHovered || isSearchFocused
        ? '1px solid #7B4FDB'
        : '1px solid #d9d9d9',

    width: isMobile ? '100%' : '340px',
    height: isMobile ? '42px' : '48px',
    boxSizing: 'border-box',

    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',

    boxShadow:
      isSearchHovered || isSearchFocused
        ? '0 0 0 3px rgba(123, 79, 219, 0.1)'
        : 'none',

    overflow: 'hidden',
    cursor: 'text'
  }}
>
  <div
    style={{
      position: 'absolute',

      // Focused = stay left
      // Not focused = return to center
      left: isSearchFocused ? '20px' : '50%',

      transform: isSearchFocused
        ? 'translateX(0)'
        : 'translateX(-50%)',

      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      whiteSpace: 'nowrap',

      transition:
        'left 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  >
    <i
      className="bi bi-search"
      style={{
        fontSize: '18px',
        color: '#9a9a9a',
        flexShrink: 0
      }}
    />

    <input
  ref={searchInputRef}
  type="text"
  placeholder="Search"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  onFocus={() => setIsSearchFocused(true)}
  style={{
    border: 'none',
    outline: 'none',
    background: 'transparent',
    width: '100px',
    padding: 0,
    margin: 0,
    fontSize: '16px',
    color: '#1a1a1a',
    textAlign: 'left'
  }}
/>
  </div>
</div>
      </div>
        {/* Main Card */}
        <div style={{
          border: '1px solid #cfcfcf',
          borderRadius: '14px',
          padding: isMobile ? '1rem 1rem 1.5rem 1rem' : '1.5rem 1.5rem 2rem 1.5rem',
          backgroundColor: '#fdfdfd'
        }}>
          {/* Filter header */}
          <div
  onClick={() => setSortAscending(!sortAscending)}
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: isMobile ? '0.75rem' : '1rem',
    marginBottom: isMobile ? '1rem' : '1.25rem',
    borderBottom: '1px solid #c9c9c9',
    cursor: 'pointer'
  }}
>
  <i
    className="bi bi-arrow-down-up"
    style={{
      fontSize: isMobile ? '18px' : '20px',
      color: '#1a1a1a'
    }}
  ></i>

  <span
    style={{
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '600',
      color: '#1a1a1a'
    }}
  >
    Filter 
  </span>
</div>

          {/* Rows + scrollbar */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div
              ref={scrollContainerRef}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '10px' : '14px',
                minWidth: 0,
                minHeight: '450px',
                maxHeight: '450px',
                overflowY: displayedSnippets.length > 6 ? 'auto' : 'hidden',
                overflowX: 'hidden',
                paddingRight: !isMobile ? '5px' : '0',
                scrollBehavior: 'smooth',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
            >
              {loading && (
                <div style={{ padding: '1rem', color: '#6a6a6a', fontSize: '15px' }}>
                  Loading snippets...
                </div>
              )}

              {!loading && error && (
                <div style={{ padding: '1rem', color: '#d64545', fontSize: '15px' }}>
                  {error}
                </div>
              )}

              {!loading && !error && displayedSnippets.length === 0 && (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '450px',
                  color: '#6428ad',
                  fontSize: '15px',
                  marginTop:'-10px'
                }}>
                  <img src={noResultsImg} alt="No snippets found" style={{ width: '400px', maxWidth: '90%' }} />
                  <span style={{marginTop:'-10px',color:'6233A1', opacity:'60%'}}>No Snippet Found!</span>
                </div>
              )}

              {!loading && !error && displayedSnippets.map((snippet, idx) => (
                <div
                  key={snippet.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: isMobile ? '0.75rem 1rem' : '1.1rem 1.5rem',
                    background: 'linear-gradient(90deg, #f7f0f4 0%, #ece2f2 100%)',
                    border: '1px solid #d8cfe0',
                    borderLeft: '5px solid #6C4FD6',
                    borderRadius: '6px',
                    cursor:'pointer',
                    gap: '10px',
                    flexWrap: 'wrap',
                    flexShrink: 0
                  }}
                >
                 <span style={{
                    fontSize: isMobile ? '16px' : '20px',
                    fontWeight: '700',
                    letterSpacing: '-0.3px',
                    color: '#1a1a2e',
                    wordBreak: 'break-word',
                    flex: '1 1 auto',
                    minWidth: 0,
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/new/${snippet.id}`)}
                  >
                    {(currentPage - 1) * PAGE_SIZE + idx + 1}) {snippet.title}
                  </span>
                  <div style={{ display: 'flex', gap: isMobile ? '12px' : '18px', flexShrink: 0 }}>
                    <i
                      className="bi bi-trash"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(snippet.id); }}
                      style={{
                        fontSize: isMobile ? '18px' : '20px',
                        color: '#d64545',
                        cursor: 'pointer'
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Scrollbar - visible only on desktop */}
            {!isMobile && displayedSnippets.length > 6 && (
              <div
                ref={scrollTrackRef}
                style={{
                  width: '8px',
                  backgroundColor: '#eee',
                  borderRadius: '4px',
                  position: 'relative',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              >
                <div
                  onMouseDown={() => setIsDraggingScrollbar(true)}
                  style={{
                    position: 'absolute',
                    top: `${scrollThumbTop}px`,
                    left: 0,
                    width: '8px',
                    height: '90px',
                    backgroundColor: '#b9aee0',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: isDraggingScrollbar ? 'none' : 'background-color 0.2s'
                  }}
                />
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: isMobile ? '1.5rem' : '2rem',
            gap: isMobile ? '1rem' : '0'
          }}>
            <button
            onClick={() => navigate("/new")}
            onMouseEnter={() => setIsCreateHovered(true)}
            onMouseLeave={() => setIsCreateHovered(false)}
            style={{
              background: 'linear-gradient(90deg, #5B6EE8 0%, #7B4FDB 100%)',
              color: 'white',
              border: 'none',
              padding: isMobile ? '12px 20px' : '14px 30px',
              borderRadius: '30px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '800',
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
            
              // Hover effect
              transform: isCreateHovered
                ? 'translateY(-2px)'
                : 'translateY(0)',
            
              boxShadow: isCreateHovered
                ? '0 8px 18px rgba(123, 79, 219, 0.35)'
                : '0 4px 10px rgba(123, 79, 219, 0.2)',
            
              transition:
                'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            >
              Create New
            </button>

            <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '8px' : '10px',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'center' : 'flex-end'
  }}
>
  {/* Previous Button */}
  <button
  onClick={handlePreviousPage}
  disabled={currentPage === 1}
  style={{
    width: isMobile ? '38px' : '42px',
    height: isMobile ? '38px' : '42px',
    border: '1px solid #b9aee0',
    backgroundColor: 'white',
    borderRadius: '10px',
    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    opacity: currentPage === 1 ? 0.5 : 1,
    transition: 'all 0.2s ease',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)'
  }}
>
  <i
    className="bi bi-chevron-left"
    style={{
      fontSize: isMobile ? '16px' : '18px',
      color: '#1a1a1a'
    }}
  ></i>
</button>

  {/* Page Numbers */}
  {getPageNumbers().map((p) => (
    <button
      key={p}
      onClick={() => setCurrentPage(p)}
      onMouseEnter={() => setHoveredPage(p)}
      onMouseLeave={() => setHoveredPage(null)}
      style={{
        width: isMobile ? '38px' : '42px',
        height: isMobile ? '38px' : '42px',
        borderRadius: '50%',
        border: '2px solid #1a1a1a',

        backgroundColor:
          currentPage === p
            ? '#1a1a1a'
            : hoveredPage === p
              ? '#f1edff'
              : 'white',

        color:
          currentPage === p
            ? 'white'
            : '#1a1a1a',

        fontSize: isMobile ? '14px' : '18px',
        fontWeight: '700',
        cursor: 'pointer',
        flexShrink: 0,

        transform: hoveredPage === p
          ? 'translateY(-2px) scale(1.05)'
          : 'translateY(0) scale(1)',

        boxShadow: hoveredPage === p
          ? '0 5px 12px rgba(123, 79, 219, 0.25)'
          : 'none',

        transition:
          'background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      {p}
    </button>
  ))}

  {/* Next Button */}
  <button
  onClick={handleNextPage}
  disabled={currentPage === totalPages}
  style={{
    width: isMobile ? '38px' : '42px',
    height: isMobile ? '38px' : '42px',
    border: '1px solid #b9aee0',
    backgroundColor: 'white',
    borderRadius: '10px',
    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    opacity: currentPage === totalPages ? 0.5 : 1,
    transition: 'all 0.2s ease',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)'
  }}
>
  <i
    className="bi bi-chevron-right"
    style={{
      fontSize: isMobile ? '16px' : '18px',
      color: '#1a1a1a'
    }}
  ></i>
</button>
</div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div
          onClick={handleCancelDelete}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.5)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              padding: isMobile ? '1.5rem' : '2rem',
              width: isMobile ? '100%' : '380px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e4dcf0',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fbeaea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <i className="bi bi-trash" style={{ fontSize: '24px', color: '#d64545' }}></i>
            </div>

            <h3 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '800',
              color: '#1a1a1a',
              margin: '0 0 0.5rem 0'
            }}>
              Delete Snippet?
            </h3>

            <p style={{
              fontSize: isMobile ? '14px' : '15px',
              color: '#6a6a6a',
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5'
            }}>
              This action cannot be undone. Are you sure you want to delete this snippet?
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCancelDelete}
                disabled={deletingId === confirmDeleteId}
                style={{
                  flex: 1,
                  border: '1px solid #b9aee0',
                  backgroundColor: 'white',
                  color: '#1a1a1a',
                  padding: '12px',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: deletingId === confirmDeleteId ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'linear-gradient(90deg, #e05656 0%, #d64545 100%)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: deletingId === confirmDeleteId ? 'not-allowed' : 'pointer',
                  boxShadow: '0 6px 15px rgba(214, 69, 69, 0.35)'
                }}
              >
                {deletingId === confirmDeleteId ? 'Deleting...' : 'Sure'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}