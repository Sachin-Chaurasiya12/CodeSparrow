import { useState, useEffect, useRef } from "react";
import logo from "./assets/brand.png";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  navigate("/", { replace: true }); // login page
  };

  const navItems = [
    { label: "Dashboard", icon: "⚡", section: "Main", path: "/dashboard" },
    { label: "Inventory", icon: "📦", section: "Main", path: "/vault" },
    { label: "DSA Arena", icon: "⚔️", section: "Main", path: "/arena" },
    { label: "XP Vault", icon: "🔁", section: "Main", path: "/learning" },
    { label: "Friends", icon: "👥", section: "Social", path: "/friends" },
    { label: "Progress", icon: "📊", section: "Social", path: "/progress" },
    { label: "Settings", icon: "⚙️", section: "Account", path: "/settings" },
    { label: "Logout", icon: "🚪", section: "Account", action: "logout" },
  ];

  const sections = [...new Set(navItems.map((n) => n.section))];
  const activePath = location.pathname;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={styles.wrapper}>

      {/* TOPBAR */}
      <header style={styles.topbar}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen((v) => !v)}
          style={styles.toggleBtn}
        >
          ☰
        </motion.button>

        <div style={styles.brandContainer}>
          <img src={logo} style={styles.logo} />
          <span style={styles.brand}>CodeSparrow</span>
        </div>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          placeholder="Search..."
          style={styles.search}
        />

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>

          {/* Notifications */}
          <div ref={notifRef} style={{ position: "relative" }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              style={styles.iconBtn}
              onClick={() => setNotifOpen((v) => !v)}
            >
              🔔
            </motion.div>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={styles.notifPanel}
                >
                  <p>No new notifications</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/internal/profile")}
            style={styles.avatar}
          >
            U
          </motion.div>
        </div>
      </header>

      {/* BODY */}
      <div style={styles.body}>

        {/* SIDEBAR */}
        <motion.aside
          animate={{ width: sidebarOpen ? 220 : 72 }}
          transition={{ duration: 0.25 }}
          style={styles.sidebar}
        >
          {sections.map((section) => (
            <div key={section}>
              {sidebarOpen && (
                <div style={styles.sidebarSection}>{section}</div>
              )}

              {navItems
                .filter((i) => i.section === section)
                .map((item) => {
                  const active = activePath === item.path;

                  return (
                    <motion.div
                      key={item.label}
                      onClick={() => {
                        if (item.action === "logout") {
                          handleLogout();
                        } else {
                          navigate(item.path);
                        }
                      }}
                      whileHover={{
                        scale: 1.03,
                        x: 3,
                        backgroundColor: active ? "#EEEDFE" : "#F3F4FF",
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        ...styles.navItem,
                        justifyContent: sidebarOpen ? "flex-start" : "center",
                        background: active ? "#EEEDFE" : "transparent",
                        color:
                          item.action === "logout"
                            ? "#dc2626"
                            : active
                            ? "#534AB7"
                            : "#5F5E5A",
                      }}
                    >
                      <span>{item.icon}</span>
                    
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
            </div>
          ))}
        </motion.aside>

        {/* MAIN */}
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ─── STYLES ─── */

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Inter, sans-serif",
    background: "#f4f6fb",
  },

  topbar: {
  height: 64,
  display: "flex",
  alignItems: "center",
  gap: 10, // slightly tighter
  padding: "0 16px",
  background: "white",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
},


  toggleBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.1)",
    background: "white",
    cursor: "pointer",
  },

  brandContainer: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  logo: { width: 38, height: 38 },
  brand: { fontWeight: 600, color: "#534AB7" ,gap:-2},

search: {
  flex: 1,
  maxWidth: 320,
  height: 36,
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.1)",
  padding: "0 12px",
  background: "#F1EFE8",
  marginLeft: 8,
  marginRight: 8,
},


iconBtn: {
  width: 30,
  height: 30,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  background: "#f5f5f5",
  fontSize: 18,
  lineHeight: 1,
  userSelect: "none",
},



  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#534AB7",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  notifPanel: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 220,
    background: "white",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  sidebar: {
    background: "white",
    borderRight: "1px solid rgba(0,0,0,0.06)",
    overflow: "hidden",
  },

  sidebarSection: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#A1A1A1",
    padding: "10px",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px",
    cursor: "pointer",
    fontSize: 13,
    borderRadius: 10,
    margin: "4px 6px",
    transition: "all 0.2s ease",
  },

  main: {
    flex: 1,
    overflowY: "auto",
    padding: 20,
  },
};
