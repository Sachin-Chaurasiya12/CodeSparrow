import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      // Remove focus
      searchInputRef.current?.blur();

      // Reset search state
      setIsSearchFocused(false);
      setIsSearchHovered(false);

      // Clear the typed text
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

  // Update scrollbar position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollHeight = container.scrollHeight - container.clientHeight;
      if (scrollHeight === 0) {
        setScrollThumbTop(0);
        return;
      }
      const scrollPercentage = container.scrollTop / scrollHeight;
      const trackHeight = 300;
      const thumbHeight = 90;
      const maxThumbTop = trackHeight - thumbHeight;
      setScrollThumbTop(scrollPercentage * maxThumbTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrollbar thumb drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingScrollbar || !scrollTrackRef.current || !scrollContainerRef.current) return;

      const track = scrollTrackRef.current;
      const container = scrollContainerRef.current;
      const rect = track.getBoundingClientRect();
      const newTop = Math.max(0, Math.min(e.clientY - rect.top, rect.height - 90));

      setScrollThumbTop(newTop);

      const scrollPercentage = newTop / (rect.height - 90);
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

  const snippets = [
    { id: 1, title: 'My first Code snippet' },
    { id: 2, title: 'My Second Code snippet' },
    { id: 3, title: 'My Third Code snippet' },
    { id: 4, title: 'My Fourth Code snippet' },
    { id: 5, title: 'My Fifth Code snippet' },
    { id: 6, title: 'My Sixth Code snippet' },
    { id: 7, title: 'My Seventh Code snippet' },
    { id: 8, title: 'My Eighth Code snippet' },
    { id: 9, title: 'My Ninth Code snippet' },
    { id: 10, title: 'My Tenth Code snippet' },
  ];
  const sortedSnippets = [...snippets].sort((a, b) =>
  sortAscending ? a.id - b.id : b.id - a.id
);
const totalPages = 2;

const handlePreviousPage = () => {
  setCurrentPage((prev) => Math.max(prev - 1, 1));
};

const handleNextPage = () => {
  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
                maxHeight: '300px',
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingRight: !isMobile ? '5px' : '0',
                scrollBehavior: 'smooth',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}
            >
              {sortedSnippets.map((snippet, idx) => (
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
                    minWidth: 0
                  }}>
                    {sortAscending ? idx + 1 : snippets.length - idx}) {snippet.title}
                  </span>
                  <div style={{ display: 'flex', gap: isMobile ? '12px' : '18px', flexShrink: 0 }}>
                    <i className="bi bi-pencil-square" style={{
                      fontSize: isMobile ? '18px' : '20px',
                      color: '#3a3a3a',
                      cursor: 'pointer'
                    }}></i>
                    <i className="bi bi-trash" style={{
                      fontSize: isMobile ? '18px' : '20px',
                      color: '#d64545',
                      cursor: 'pointer'
                    }}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Scrollbar - visible only on desktop */}
            {!isMobile && (
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
  {[1, 2].map((p) => (
    <button
      key={p}
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, 2))}
      onMouseEnter={() => setHoveredArrow('right')}
      onMouseLeave={() => setHoveredArrow(null)}
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
    </div>
  );
}