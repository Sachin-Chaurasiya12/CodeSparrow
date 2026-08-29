import React, { useState } from "react";
import { Globe2, Users, User, Search, Send, ShieldCheck } from "lucide-react";
import "./Community.css";

const ACCENT = "#6C5CE7";

const initialMessages = [
  { id: 1, sender: "other", username: "username", time: "23:00", text: "This is a client message the message will come here and look like this" },
  { id: 2, sender: "other", username: "username", time: "23:00", text: "The message will be hardcoded for sometime" },
  { id: 3, sender: "me", time: "23:00", text: "This is your message , you will get" },
  { id: 4, sender: "me", time: "23:00", text: "it on this side" },
];

const communityRules = [
  "Be respectful. No harassment, hate speech, or personal attacks.",
  "No spam, self-promotion, or unsolicited advertising.",
  "Do not share another member's private information.",
  "Keep discussions relevant to coding, DSA, and CodeCabinate topics.",
  "No plagiarized or paid solutions posing as your own work.",
  "Report abusive behavior instead of engaging in conflict.",
  "Violation of these rules may result in a temporary or permanent ban.",
];

export default function CommunityChat({ onOpenConnections, onOpenSearch }) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", time: "23:00", text: draft.trim() },
    ]);
    setDraft("");
  };

  return (
    <div className="community-page">
      <div className="community-topbar">
        <User size={28} />
        <span className="community-topbar-title">Connect</span>
      </div>

      <div className="community-body">
        <div className={`chat-panel ${!hasJoined ? "chat-panel-terms" : ""}`}>
          <div className="chat-header">
            <div className="chat-header-bar" style={{ backgroundColor: ACCENT }} />
            <h2 className="chat-header-title">Community</h2>
          </div>

          {!hasJoined ? (
            <div className="rules-gate">
              <div className="rules-card">
                <div className="rules-card-icon" style={{ backgroundColor: ACCENT }}>
                  <ShieldCheck size={28} className="icon-white" />
                </div>

                <h2 className="rules-title">Welcome to the Community</h2>
                <p className="rules-description">
                  The Community space exists so CodeCabinate members can connect, ask questions,
                  share DSA insights, and help each other grow as developers. To keep this a
                  safe and productive space for everyone, please read and agree to the rules
                  below before you start chatting.
                </p>

                <h3 className="rules-subtitle">Community Guidelines</h3>
                <ul className="rules-list">
                  {communityRules.map((rule, idx) => (
                    <li key={idx} className="rules-list-item">
                      {rule}
                    </li>
                  ))}
                </ul>

                <label className="rules-agree-row">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="rules-agree-checkbox"
                  />
                  <span>I have read and agree to follow the Community Guidelines</span>
                </label>

                <button
                  className="join-community-btn"
                  style={{ backgroundColor: ACCENT }}
                  disabled={!agreed}
                  onClick={() => setHasJoined(true)}
                >
                  Join Community
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="messages-list">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`message-row ${m.sender === "me" ? "message-row-me" : "message-row-other"}`}
                  >
                    {m.sender === "other" && (
                      <span className="message-meta" style={{ color: ACCENT }}>
                        {m.time} | {m.username}
                      </span>
                    )}
                    <div
                      className={`message-bubble ${m.sender === "me" ? "message-bubble-me" : "message-bubble-other"}`}
                      style={m.sender === "me" ? { backgroundColor: "#D9D3FA" } : undefined}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="composer">
                <div className="composer-row">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Send Message here..."
                    className="composer-input"
                  />
                  <button
                    onClick={sendMessage}
                    className="composer-send-btn"
                    style={{ backgroundColor: ACCENT }}
                    aria-label="Send"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="sidebar">
          <button
            className="sidebar-btn"
            style={{ backgroundColor: ACCENT }}
            aria-label="Community"
          >
            <Globe2 size={20} className="icon-white" />
          </button>
          <button
            onClick={onOpenConnections}
            className="sidebar-btn sidebar-btn-hover"
            aria-label="Connections"
          >
            <Users size={20} className="icon-accent" />
          </button>
          <button
            onClick={onOpenSearch}
            className="sidebar-btn sidebar-btn-hover"
            aria-label="Search"
          >
            <Search size={20} className="icon-accent" />
          </button>
        </div>
      </div>
    </div>
  );
}