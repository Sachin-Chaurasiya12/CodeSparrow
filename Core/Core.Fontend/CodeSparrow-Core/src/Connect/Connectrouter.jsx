import React, { useState } from "react";
import { Globe2, Search, Send, X, UserPlus } from "lucide-react";
import CommunityChat from "./Communitychat";
import ConnectionsPage from "./Connectionspage";
import "./Community.css";

const ACCENT = "#6C5CE7";

const suggestedUsers = [
  { id: 1, username: "Username", fullName: "Full Name", color: "#3730E0" },
  { id: 2, username: "Username", fullName: "Full Name", color: "#2B8CFF" },
  { id: 3, username: "Username", fullName: "Full Name", color: "#9B59F6" },
  { id: 4, username: "Username", fullName: "Full Name", color: "#F2545B" },
];

export default function ConnectRouter({ onBack }) {
  const [page, setPage] = useState("community"); // "community" | "connections" | "closed"
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [connected, setConnected] = useState({});

  const filteredUsers = suggestedUsers.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  const handleConnect = (id) => {
    setConnected((prev) => ({ ...prev, [id]: true }));
  };

  if (page === "closed") {
    return (
      <div className="community-closed">
        <button
          onClick={() => setPage("community")}
          className="btn-open-community"
          style={{ backgroundColor: ACCENT }}
        >
          Open Community
        </button>
      </div>
    );
  }

  return (
    <>
      {page === "community" && (
        <CommunityChat
          onOpenConnections={() => setPage("connections")}
          onOpenSearch={() => setSearchOpen(true)}
        />
      )}

      {page === "connections" && (
        <ConnectionsPage
          onOpenCommunity={() => setPage("community")}
          onOpenSearch={() => setSearchOpen(true)}
        />
      )}

      {searchOpen && (
        <div className="search-overlay">
          <div className="search-modal">
            <button
              onClick={() => setSearchOpen(false)}
              className="search-close-btn"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="search-input-row">
              <Search size={18} className="search-input-icon" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search to Connect..."
                className="search-input"
              />
            </div>
            <hr className="search-divider" />

            <div className="search-results">
              {filteredUsers.map((u) => (
                <div key={u.id} className="search-result-row">
                  <div className="search-result-user">
                    <div
                      className="search-result-avatar"
                      style={{ backgroundColor: u.color }}
                    />
                    <div>
                      <div className="search-result-username">{u.username}</div>
                      <div className="search-result-fullname">{u.fullName}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConnect(u.id)}
                    disabled={connected[u.id]}
                    className="connect-btn"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <UserPlus size={16} />
                    {connected[u.id] ? "Connected" : "Connect"}
                  </button>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="search-no-results">No users found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}