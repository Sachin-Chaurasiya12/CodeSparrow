import { useState, useEffect, useRef } from "react";
import logo from "./assets/brand.png";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8081/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout failed : ", error);
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login", { replace: true }); // login page
    }
  };

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:8082/layout/menu", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch menus");
        }

        const data = await response.json();

        console.log("Menus:", data);

        setMenus(data);
      } catch (error) {
        console.error("Menu fetch failed:", error);
      }
    };

    fetchMenus();
  }, []);

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
          <span onClick={() => navigate("/dashboard")} style={styles.brand}>
            CodeSparrow
          </span>
        </div>

        <div style={styles.searchWrapper}>
          <i className="bi bi-search" style={styles.searchIcon}></i>

          <motion.input
            placeholder="Search..."
            style={styles.search}
          />
        </div>
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
  animate={{
    width: sidebarOpen ? 240 : 72,
  }}
  transition={{
    duration: 0.25,
    ease: "easeInOut",
  }}
  style={styles.sidebar}
>
  <div style={styles.sidebarSeparator} />

  <div style={styles.navList}>
    {menus.map((item) => {
      const isLogout = item.name === "Logout";

      const active =
        !isLogout &&
        (activePath === item.route ||
          activePath.startsWith(item.route + "/"));

      return (
        <motion.div
          key={item.id}
          title={!sidebarOpen ? item.name : undefined}
          onClick={() => {
            if (isLogout) {
              handleLogout();
              return;
            }

            if (item.route) {
              navigate(item.route);
            }
          }}
          whileHover={{
            x: 2,
            backgroundColor: isLogout
              ? "#FEF2F2"
              : active
              ? "#F0EDFF"
              : "#F8F7FC",
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            ...styles.navItem,

            justifyContent: sidebarOpen
              ? "flex-start"
              : "center",

            background: active
              ? "#F0EDFF"
              : "transparent",

            color: isLogout
              ? "#DC2626"
              : active
              ? "#534AB7"
              : "#5F5E5A",

            fontWeight: active ? 600 : 500,
          }}
        >
          {active && (
            <motion.div
              style={styles.activeIndicator}
            />
          )}

          <span
            style={{
              ...styles.navIcon,
              color: isLogout
                ? "#DC2626"
                : active
                ? "#534AB7"
                : "#77736E",
            }}
          >
            <i className={`bi ${item.icon}`}></i>
          </span>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                style={styles.navLabel}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      );
    })}
  </div>
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
    gap: 10,
    padding: "0 16px",
    background: "white",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    position: "relative",
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
    cursor:"pointer",
  },

  logo: { width: 38, height: 38 },
  brand: { fontWeight: 600, color: "#534AB7", gap: -2 },

  search: {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",

  width: "clamp(220px, 30vw, 375px)",
  height: 36,

  padding: "0 14px",

  borderRadius: 10,
  border: "1px solid #DCD9D2",

  background: "#F7F6F2",
  color: "#333",

  fontSize: 13,
  fontFamily: "Inter, sans-serif",

  outline: "none",

  boxSizing: "border-box",

  transition: "all 0.2s ease",

  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
},

searchWrapper: {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",

  width: "clamp(220px, 30vw, 375px)",
  height: 36,

  display: "flex",
  alignItems: "center",

  background: "#F7F6F2",
  border: "1px solid #DCD9D2",
  borderRadius: 10,

  boxSizing: "border-box",

  transition: "all 0.2s ease",
},

searchIcon: {
  marginLeft: 12,
  color: "#85827B",
  fontSize: 14,
  flexShrink: 0,
},

search: {
  flex: 1,
  height: "100%",
  border: "black",
  padding: "0 12px 0 8px",

  border: "none",
  outline: "none",
  background: "transparent",

  color: "#333",
  fontSize: 13,
  fontFamily: "Inter, sans-serif",

  boxSizing: "border-box",
},

  sidebarSeparator: {
  position: "absolute",
  top: 0,
  right: 0,
  width: 1,
  height: "100%",
  background: "#E5E4EA",
  pointerEvents: "none",
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
  background: "#F4F6FB",
},
sidebar: {
  position: "relative",
  background: "#FFFFFF",
  overflow: "hidden",
  flexShrink: 0,
  zIndex: 2,
},

navList: {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  padding: "20px 10px",
},

navItem: {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: 42,
  padding: "0 12px",
  cursor: "pointer",
  fontSize: 13,
  borderRadius: 9,
  whiteSpace: "nowrap",
  transition: "all 0.2s ease",
  userSelect: "none",
},

activeIndicator: {
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  width: 3,
  height: 22,
  borderRadius: "0 4px 4px 0",
  background: "#534AB7",
},

navIcon: {
  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  width: 24,

  height: 24,

  flexShrink: 0,

  fontSize: 18,

  lineHeight: 1,

  transition: "color 0.2s ease",
},

navLabel: {
  overflow: "hidden",

  textOverflow: "ellipsis",

  fontSize: 13,

  letterSpacing: "-0.2px",

  whiteSpace: "nowrap",
},

  main: {
  flex: 1,
  overflowY: "auto",
  padding: "28px 32px",
  background: "#F4F6FB",
},
};