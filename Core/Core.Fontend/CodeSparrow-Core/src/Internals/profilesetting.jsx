import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AccountSettingsPage({ onBack }) {
  const [countries, setCountries] = useState([]);
  const [activeSection, setActiveSection] = useState("personal");
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150");  
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();
        setCountries(
          data.map((c) => ({ name: c.name.common })).sort((a, b) => a.name.localeCompare(b.name))
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const navigate = useNavigate();
  
    const profile = async () => {
        navigate("/internal/profile")
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setAvatar(imageUrl);
        }
    };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .as-root {
          min-height: 100vh;
          background: #f0f4ff;
          font-family: 'DM Sans', sans-serif;
          color: #1a1d2e;
          padding: 32px 20px 60px;
        }

        /* ── TOP BAR ── */
        .as-topbar {
          max-width: 860px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .as-back-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          background: #fff;
          border: 1.5px solid #c5d0ff;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #3b5bdb;
          cursor: pointer;
          transition: background .15s;
        }
        .as-back-btn:hover { background: #eef2ff; }
        .as-page-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #1a1d2e;
        }

        /* ── SHELL ── */
        .as-shell {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        /* ── SIDEBAR NAV ── */
        .as-nav {
          width: 210px;
          flex-shrink: 0;
          background: #fff;
          border-radius: 16px;
          padding: 12px 10px;
          box-shadow: 0 4px 20px rgba(59,91,219,.08);
          position: sticky;
          top: 24px;
        }
        .as-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: background .15s, color .15s;
          user-select: none;
        }
        .as-nav-item:hover { background: #f0f4ff; color: #3b5bdb; }
        .as-nav-item.active { background: #eef2ff; color: #3b5bdb; font-weight: 600; }
        .as-nav-item.active svg { stroke: #3b5bdb; }
        .as-nav-sep { height: 1px; background: #edf0ff; margin: 8px 4px; }

        /* ── MAIN PANEL ── */
        .as-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ── SECTION CARD ── */
        .as-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(59,91,219,.08);
          overflow: hidden;
        }
        .as-card-header {
          padding: 18px 24px 14px;
          border-bottom: 1px solid #edf0ff;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .as-card-header-icon {
          width: 34px; height: 34px;
          background: #eef2ff;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .as-card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #1a1d2e;
        }
        .as-card-subtitle { font-size: 12px; color: #9ca3af; margin-top: 1px; }
        .as-card-body { padding: 22px 24px; }

        /* ── AVATAR UPLOAD ── */
        .as-avatar-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 22px;
          border-bottom: 1px solid #f0f4ff;
          margin-bottom: 22px;
        }
        .as-avatar-wrap { position: relative; cursor: pointer; }
        .as-avatar {
          width: 76px; height: 76px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #c5d0ff;
          display: block;
        }
        .as-avatar-overlay {
          position: absolute; inset: 0;
          background: rgba(59,91,219,.45);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity .18s;
        }
        .as-avatar-wrap:hover .as-avatar-overlay { opacity: 1; }
        .as-avatar-text { font-size: 13px; color: #4a5568; }
        .as-avatar-text b { color: #3b5bdb; cursor: pointer; }
        .as-avatar-hint { font-size: 11.5px; color: #9ca3af; margin-top: 3px; }

        /* ── FORM GRID ── */
        .as-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        .as-grid.full { grid-template-columns: 1fr; }
        .as-field { display: flex; flex-direction: column; gap: 5px; }
        .as-field.span2 { grid-column: span 2; }
        .as-label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: .3px;
          text-transform: uppercase;
        }
        .as-input, .as-select, .as-textarea {
          padding: 9px 12px;
          border: 1.5px solid #e5e7eb;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1d2e;
          background: #fafbff;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          width: 100%;
        }
        .as-input:focus, .as-select:focus, .as-textarea:focus {
          border-color: #748ffc;
          box-shadow: 0 0 0 3px rgba(116,143,252,.15);
          background: #fff;
        }
        .as-textarea { resize: vertical; min-height: 88px; }

        /* ── SAVE BAR ── */
        .as-save-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 20px rgba(59,91,219,.08);
          position: sticky;
          bottom: 20px;
        }
        .as-discard {
          padding: 9px 20px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          transition: border-color .15s;
        }
        .as-discard:hover { border-color: #9ca3af; }
        .as-save {
          padding: 9px 28px;
          background: linear-gradient(135deg, #3b5bdb, #4c6ef5);
          border: none;
          border-radius: 9px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(59,91,219,.28);
          transition: transform .12s, box-shadow .12s;
        }
        .as-save:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(59,91,219,.35); }
        .as-saved-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px;
          background: #dcfce7;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #15803d;
          animation: fadeIn .2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

        /* ── PASSWORD SECTION ── */
        .as-pw-note {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }

        @media (max-width: 680px) {
          .as-shell { flex-direction: column; }
          .as-nav { width: 100%; position: static; display: flex; gap: 4px; padding: 8px; overflow-x: auto; }
          .as-nav-sep { display: none; }
          .as-grid { grid-template-columns: 1fr; }
          .as-field.span2 { grid-column: span 1; }
        }
      `}</style>

      <div className="as-root">
        {/* Top bar */}
        <div className="as-topbar">
          <button className="as-back-btn" onClick={profile}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>
          <h1 className="as-page-title">Account Settings</h1>
        </div>

        <div className="as-shell">
          {/* Sidebar nav */}
          <nav className="as-nav">
            {[
              { id: "personal", label: "Personal Info", icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
              { id: "contact", label: "Contact", icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.97 10.8a19.8 19.8 0 01-3.07-8.67A2 2 0 012.88 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.09 7.69a16 16 0 006.22 6.22l1.05-1.06a2 2 0 012.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg> },
            ].map(({ id, label, icon }) => (
              <div
                key={id}
                className={`as-nav-item${activeSection === id ? " active" : ""}`}
                onClick={() => setActiveSection(id)}
              >
                {icon} {label}
              </div>
            ))}
          </nav>

          {/* Main */}
          <div className="as-main">

            {/* Personal Info */}
            {activeSection === "personal" && (
              <div className="as-card">
                <div className="as-card-header">
                  <div className="as-card-header-icon">
                    <svg width="16" height="16" fill="none" stroke="#3b5bdb" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </div>
                  <div>
                    <div className="as-card-title">Personal Information</div>
                    <div className="as-card-subtitle">Update your name, username and bio</div>
                  </div>
                </div>
                <div className="as-card-body">
                  {/* Avatar upload */}
                  <div className="as-avatar-row">
                      <div className="as-avatar-wrap">

                        {/* Avatar Image (click to upload) */}
                        <img
                          src={avatar}
                          alt="avatar"
                          className="as-avatar"
                          onClick={() => fileInputRef.current.click()}
                          style={{ cursor: "pointer" }}
                        />

                        {/* Edit overlay */}
                        <div
                          className="as-avatar-overlay"
                          onClick={() => fileInputRef.current.click()}
                          style={{ cursor: "pointer" }}
                        >
                          <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </div>

                        {/* Hidden file input */}
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleAvatarChange}
                          style={{ display: "none" }}
                        />
                      </div>

                      <div>
                        <p className="as-avatar-text"><b>Upload new photo</b></p>
                        <p className="as-avatar-hint">JPG, PNG or GIF · Max 2 MB</p>
                      </div>
                    </div>

                  <div className="as-grid">
                    <div className="as-field">
                      <label className="as-label">First Name</label>
                      <input className="as-input" type="text" defaultValue="Nathaniel" placeholder="First name" />
                    </div>
                    <div className="as-field">
                      <label className="as-label">Last Name</label>
                      <input className="as-input" type="text" defaultValue="Poole" placeholder="Last name" />
                    </div>
                    <div className="as-field">
                      <label className="as-label">Username</label>
                      <input className="as-input" type="text" defaultValue="nathanielpoole" placeholder="username" />
                    </div>
                    <div className="as-field">
                      <label className="as-label">Company</label>
                      <input className="as-input" type="text" defaultValue="Microsoft Inc." placeholder="Your company" />
                    </div>
                    <div className="as-field span2">
                      <label className="as-label">Bio</label>
                      <textarea className="as-textarea" defaultValue="Passionate about building scalable systems and clean interfaces. Love competitive programming and contributing to open source on weekends." />
                    </div>
                    <div className="as-field">
                      <label className="as-label">Website</label>
                      <input className="as-input" type="text" defaultValue="nathanielpoole.dev" placeholder="yoursite.com" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact */}
            {activeSection === "contact" && (
              <div className="as-card">
                <div className="as-card-header">
                  <div className="as-card-header-icon">
                    <svg width="16" height="16" fill="none" stroke="#3b5bdb" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.97 10.8a19.8 19.8 0 01-3.07-8.67A2 2 0 012.88 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.09 7.69a16 16 0 006.22 6.22l1.05-1.06a2 2 0 012.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
                  </div>
                  <div>
                    <div className="as-card-title">Contact Details</div>
                    <div className="as-card-subtitle">Email, phone and location</div>
                  </div>
                </div>
                <div className="as-card-body">
                  <div className="as-grid">
                    <div className="as-field">
                      <label className="as-label">Email Address</label>
                      <input className="as-input" type="email" defaultValue="nathaniel@microsoft.com" placeholder="email@example.com" />
                    </div>
                    <div className="as-field">
                      <label className="as-label">Phone Number</label>
                      <input className="as-input" type="tel" defaultValue="+91 98765 43210" placeholder="+1 234 567 890" />
                    </div>
                    <div className="as-field">
                      <label className="as-label">City</label>
                      <input className="as-input" type="text" defaultValue="Mumbai" placeholder="Your city" />
                    </div>
                    <div className="as-field">
                      <label className="as-label">State</label>
                      <input className="as-input" type="text" defaultValue="Maharashtra" placeholder="State / Province" />
                    </div>
                    <div className="as-field span2">
                      <label className="as-label">Country</label>
                      <select className="as-select" defaultValue="India">
                        <option value="">Select Country</option>
                        {countries.map((c, i) => (
                          <option key={i} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save bar */}
            <div className="as-save-bar">
              {saved && (
                <div className="as-saved-pill">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  Saved!
                </div>
              )}
              <button className="as-discard">Discard</button>
              <button className="as-save" onClick={handleSave}>Save Changes</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}