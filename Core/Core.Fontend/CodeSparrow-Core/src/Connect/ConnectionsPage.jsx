import React, { useState } from "react";
import { Globe2, Users, User, Search, Send, ArrowLeft, MessageCircle } from "lucide-react";
import "./Community.css";

const ACCENT = "#6C5CE7";

const chatConnections = [
  { id: 1, fullName: "Full Name", color: "#E15C5C", lastMessage: "This is your message , you will get" },
  { id: 2, fullName: "Full Name", color: "#3730E0", lastMessage: "Hey, are you free tomorrow?" },
  { id: 3, fullName: "Full Name", color: "#2B8CFF", lastMessage: "Sounds good, talk soon" },
  { id: 4, fullName: "Full Name", color: "#9B59F6", lastMessage: "Thanks for connecting!" },
];

const initialDirectMessages = [
  { id: 1, sender: "other", time: "23:00", text: "This is a client message the message will come here and look like this" },
  { id: 2, sender: "other", time: "23:00", text: "The message will be hardcoded for sometime" },
  { id: 3, sender: "me", time: "23:00", text: "This is your message , you will get" },
  { id: 4, sender: "me", time: "23:00", text: "it on this side" },
];

export default function ConnectionsPage({ onOpenCommunity, onOpenSearch }) {
  const [view, setView] = useState("connections"); // "connections" | "chat"
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [messages, setMessages] = useState(initialDirectMessages);
  const [draft, setDraft] = useState("");

  const openChat = (user) => {
    setActiveChatUser(user);
    setMessages(initialDirectMessages);
    setView("chat");
  };

  const backToList = () => {
    setActiveChatUser(null);
    setView("connections");
  };

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", time: "23:00", text: draft.trim() },
    ]);
    setDraft("");
  };

  const isChatView = view === "chat";

  return (
    <div className="community-page">
      <div className="community-topbar">
        <User size={28} />
        <span className="community-topbar-title">Connect</span>
      </div>

      <div className="community-body">
        <div className="chat-panel">
          <div className="chat-header">
            {isChatView && (
              <button onClick={backToList} className="back-btn" aria-label="Back">
                <ArrowLeft size={20} className="back-icon" />
              </button>
            )}

            {isChatView ? (
              <>
                <div
                  className="chat-header-avatar"
                  style={{ backgroundColor: activeChatUser?.color }}
                />
                <h2 className="chat-header-title chat-header-title-muted">
                  {activeChatUser?.fullName}
                </h2>
              </>
            ) : (
              <>
                <div className="chat-header-bar" style={{ backgroundColor: ACCENT }} />
                <h2 className="chat-header-title">Connections</h2>
              </>
            )}
          </div>

          {isChatView ? (
            <>
              <div className="messages-list">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`message-row ${m.sender === "me" ? "message-row-me" : "message-row-other"}`}
                  >
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
          ) : (
            <div className="connections-list">
              {chatConnections.map((c) => (
                <div key={c.id} className="connection-row">
                  <div className="connection-avatar-wrap">
                    <div className="connection-avatar" style={{ backgroundColor: c.color }} />
                    <span className="connection-status-dot" />
                  </div>
                  <div className="connection-info">
                    <div className="connection-name">{c.fullName}</div>
                    <div className="connection-lastmsg">{c.lastMessage}</div>
                  </div>
                  <button
                    className="connection-message-btn"
                    style={{ backgroundColor: ACCENT }}
                    onClick={() => openChat(c)}
                    aria-label={`Message ${c.fullName}`}
                  >
                    <MessageCircle size={16} />
                    Message
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar">
          <button
            onClick={onOpenCommunity}
            className="sidebar-btn sidebar-btn-hover"
            aria-label="Community"
          >
            <Globe2 size={20} className="icon-accent" />
          </button>
          <button
            className="sidebar-btn"
            style={{ backgroundColor: ACCENT }}
            aria-label="Connections"
          >
            <Users size={20} className="icon-white" />
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