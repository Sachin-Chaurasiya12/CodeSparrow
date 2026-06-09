import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ onEditClick }) {
  const [activeTab, setActiveTab] = useState("solved");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:8085/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      // console.log("Profile Data:", data);

      setProfile(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

    const setting = async () => {
      navigate("/internal/profilesetting")
    }

    if (loading) {
        return (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            Loading Profile...
          </div>
        );
      }
      if (error) {
        return (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
            }}
          >
            {error}
          </div>
        );
      }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-root {
          min-height: 100vh;
          background: #f0f4ff;
          font-family: 'DM Sans', sans-serif;
          color: #1a1d2e;
        }

        /* ── BANNER ── */
        .pp-banner {
          height: 300px;
          background: linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 50%, #748ffc 100%);
          position: relative;
          overflow: hidden;
        }
        .pp-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 80% 20%, rgba(255,255,255,.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 80% at 10% 90%, rgba(116,143,252,.35) 0%, transparent 70%);
        }
        .pp-banner-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,.18) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        /* ── LAYOUT ── */
        .pp-layout {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px 60px;
        }

        /* ── CARD ── */
        .pp-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(59,91,219,.10), 0 1px 4px rgba(59,91,219,.06);
          margin-top: -140px;
          padding: 0 0 28px;
          position: relative;
          overflow: visible;
        }
        .pp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b5bdb, #748ffc, #3b5bdb);
          background-size: 200%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% 0; } }

        /* ── AVATAR ROW ── */
        .pp-avatar-row {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          padding: 0 32px;
          margin-top: -30px;
        }
        .pp-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .pp-avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 4px solid #fff;
          object-fit: cover;
          box-shadow: 0 4px 16px rgba(59,91,219,.22);
          display: block;
        }
        .pp-online {
          position: absolute;
          bottom: 6px; right: 6px;
          width: 14px; height: 14px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        .pp-identity {
          padding-bottom: 6px;
          flex: 1;
        }
        .pp-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #1a1d2e;
          line-height: 1.15;
        }
        .pp-role {
          font-size: 13px;
          color: #748ffc;
          font-weight: 500;
          margin-top: 3px;
          letter-spacing: .3px;
        }
        .pp-actions {
          display: flex;
          gap: 10px;
          padding-bottom: 6px;
          margin-left: auto;
        }
        .pp-btn-outline {
          padding: 8px 18px;
          border: 1.5px solid #c5d0ff;
          background: #fff;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #3b5bdb;
          cursor: pointer;
          transition: background .15s, border-color .15s;
        }
        .pp-btn-outline:hover { background: #eef2ff; border-color: #748ffc; }
        .pp-btn-primary {
          padding: 8px 18px;
          background: linear-gradient(135deg, #3b5bdb, #4c6ef5);
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(59,91,219,.30);
          transition: transform .12s, box-shadow .12s;
        }
        .pp-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(59,91,219,.35); }

        /* ── BIO + META ── */
        .pp-bio-row {
          padding: 18px 32px 0;
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .pp-bio {
          flex: 1;
          min-width: 220px;
          font-size: 14px;
          color: #4a5568;
          line-height: 1.65;
        }
        .pp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          align-items: center;
          font-size: 13px;
          color: #6b7280;
        }
        .pp-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .pp-meta-item svg { flex-shrink: 0; }

        /* ── DIVIDER ── */
        .pp-divider {
          margin: 20px 32px 0;
          border: none;
          border-top: 1px solid #edf0ff;
        }

        /* ── STATS ROW ── */
        .pp-stats {
          display: flex;
          justify-content: space-around;
          padding: 20px 32px 0;
          gap: 12px;
          flex-wrap: wrap;
        }
        .pp-stat {
          text-align: center;
          flex: 1;
          min-width: 80px;
        }
        .pp-stat-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 26px;
          color: #3b5bdb;
          line-height: 1;
        }
        .pp-stat-label {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 4px;
          letter-spacing: .3px;
        }
        .pp-stat-sep {
          width: 1px;
          background: #edf0ff;
          align-self: stretch;
        }

        /* ── TABS ── */
        .pp-tabs {
          display: flex;
          gap: 4px;
          padding: 20px 32px 0;
          border-bottom: 1px solid #edf0ff;
        }
        .pp-tab {
          padding: 8px 16px;
          border-radius: 8px 8px 0 0;
          font-size: 13px;
          font-weight: 500;
          color: #9ca3af;
          cursor: pointer;
          border: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          transition: color .15s;
        }
        .pp-tab.active {
          color: #3b5bdb;
          font-weight: 600;
        }
        .pp-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: #3b5bdb;
          border-radius: 2px 2px 0 0;
        }
        .pp-tab:hover:not(.active) { color: #4a5568; }

        /* ── TAB CONTENT ── */
        .pp-tab-body { padding: 20px 32px 0; }

        /* Activity grid (like GitHub contribution chart) */
        .pp-activity-label {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 10px;
        }
        .pp-activity-grid {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .pp-act-cell {
          width: 14px; height: 14px;
          border-radius: 3px;
          background: #edf0ff;
        }
        .pp-act-cell.l1 { background: #c5d0ff; }
        .pp-act-cell.l2 { background: #748ffc; }
        .pp-act-cell.l3 { background: #4c6ef5; }
        .pp-act-cell.l4 { background: #3b5bdb; }

        /* Solved list */
        .pp-solved-list { display: flex; flex-direction: column; gap: 10px; }
        .pp-solved-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: #f8f9ff;
          border-radius: 10px;
          border: 1px solid #edf0ff;
          font-size: 13px;
        }
        .pp-badge {
          padding: 3px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .3px;
        }
        .pp-badge.easy { background: #dcfce7; color: #15803d; }
        .pp-badge.medium { background: #fff7ed; color: #c2410c; }
        .pp-badge.hard { background: #fee2e2; color: #b91c1c; }
        .pp-solved-title { flex: 1; font-weight: 500; color: #1a1d2e; }
        .pp-solved-lang { color: #9ca3af; font-size: 12px; }

        /* ── EDIT CTA ── */
        .pp-edit-cta {
          display: flex;
          justify-content: center;
          padding: 28px 32px 0;
        }
        .pp-edit-big-btn {
          padding: 12px 36px;
          background: linear-gradient(135deg, #3b5bdb, #4c6ef5);
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          letter-spacing: .4px;
          box-shadow: 0 4px 18px rgba(59,91,219,.30);
          transition: transform .12s, box-shadow .12s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pp-edit-big-btn:hover { transform: translateY(-2px); box-shadow: 0 7px 24px rgba(59,91,219,.38); }

        @media (max-width: 640px) {
          .pp-avatar-row { flex-wrap: wrap; }
          .pp-actions { margin-left: 0; width: 100%; }
          .pp-stats { padding: 16px 20px 0; }
          .pp-bio-row, .pp-tabs, .pp-tab-body, .pp-edit-cta { padding-left: 20px; padding-right: 20px; }
          .pp-divider { margin: 16px 20px 0; }
        }
      `}</style>

      <div className="pp-root">
        {/* Banner */}
        <div className="pp-banner">
          <div className="pp-banner-dots" />
        </div>

        <div className="pp-layout">
          <div className="pp-card">

            {/* Avatar + identity */}
            <div className="pp-avatar-row">
              <div className="pp-avatar-wrap">
                <img
                    src={
                      profile?.avatarUrl ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt="avatar"
                    className="pp-avatar"
                  />
                <span className="pp-online" title="Online" />
              </div>
              <div className="pp-identity">
                <div className="pp-name">
                  {profile?.username || "Unknown User"}
                </div>
                <div className="pp-role">
                  {profile?.company || "No Company Added"}
                </div>
              </div>
              <div className="pp-actions">
                <button className="pp-btn-outline">Share Profile</button>
              </div>
            </div>

            {/* Bio + meta */}
            <div className="pp-bio-row">
                <p className="pp-bio">
                  {profile?.bio || "No bio available"}
                </p>
              <div className="pp-meta">
                <span className="pp-meta-item">
                  {[
                    profile?.city,
                    profile?.state,
                    profile?.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
                <span className="pp-meta-item">
                  Joined{" "}
                  {profile?.joinedAt
                    ? new Date(profile.joinedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                        }
                      )
                    : "Recently"}
                </span>
                <span className="pp-meta-item">
                  {profile?.website || "No Website"}
                </span>
              </div>
            </div>

            <hr className="pp-divider" />

            {/* Stats */}
            <div className="pp-stats">
              <div className="pp-stat">
                <div className="pp-stat-num">32</div>
                <div className="pp-stat-label">Snippets</div>
              </div>
              <div className="pp-stat-sep" />
              <div className="pp-stat">
                <div className="pp-stat-num">26</div>
                <div className="pp-stat-label">Solved</div>
              </div>
              <div className="pp-stat-sep" />
              <div className="pp-stat">
                <div className="pp-stat-num">148</div>
                <div className="pp-stat-label">Contributions</div>
              </div>
              <div className="pp-stat-sep" />
              <div className="pp-stat">
                <div className="pp-stat-num">1.2k</div>
                <div className="pp-stat-label">Followers</div>
              </div>
            </div>

            <hr className="pp-divider" style={{ marginTop: 20 }} />

            {/* Tabs */}
            <div className="pp-tabs">
              {["solved", "activity", "snippets"].map(t => (
                <button
                  key={t}
                  className={`pp-tab${activeTab === t ? " active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab body */}
            <div className="pp-tab-body">
              {activeTab === "solved" && (
                <div className="pp-solved-list">
                  {[
                    { title: "Two Sum", diff: "easy", lang: "Python" },
                    { title: "Longest Substring Without Repeating Characters", diff: "medium", lang: "JavaScript" },
                    { title: "Median of Two Sorted Arrays", diff: "hard", lang: "C++" },
                    { title: "Valid Parentheses", diff: "easy", lang: "Python" },
                    { title: "Merge Intervals", diff: "medium", lang: "Java" },
                  ].map((p, i) => (
                    <div key={i} className="pp-solved-item">
                      <span className={`pp-badge ${p.diff}`}>{p.diff}</span>
                      <span className="pp-solved-title">{p.title}</span>
                      <span className="pp-solved-lang">{p.lang}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "activity" && (
                <>
                  <p className="pp-activity-label">Contributions in the last 52 weeks</p>
                  <div className="pp-activity-grid">
                    {Array.from({ length: 182 }).map((_, i) => {
                      const r = Math.random();
                      const lvl = r > .85 ? "l4" : r > .65 ? "l3" : r > .45 ? "l2" : r > .3 ? "l1" : "";
                      return <div key={i} className={`pp-act-cell ${lvl}`} />;
                    })}
                  </div>
                </>
              )}

              {activeTab === "snippets" && (
                <div className="pp-solved-list">
                  {[
                    { title: "Debounce utility", lang: "TypeScript" },
                    { title: "Binary search template", lang: "Python" },
                    { title: "React custom hook: useLocalStorage", lang: "JavaScript" },
                    { title: "Segment tree implementation", lang: "C++" },
                  ].map((s, i) => (
                    <div key={i} className="pp-solved-item">
                      <svg width="15" height="15" fill="none" stroke="#748ffc" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                      <span className="pp-solved-title">{s.title}</span>
                      <span className="pp-solved-lang">{s.lang}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Edit CTA */}
            <div className="pp-edit-cta">
              <button className="pp-edit-big-btn" onClick={setting}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}