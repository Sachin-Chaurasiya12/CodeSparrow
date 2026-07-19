import { useState, useEffect } from "react";

/* ─── ANIMATED COUNTER HOOK ─── */
function useCountUp(target, duration = 1000, delay = 200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let timer;

    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration / 16);

      timer = setInterval(() => {
        start = Math.min(start + step, target);
        setValue(Math.round(start));

        if (start >= target) clearInterval(timer);
      }, 16);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [target, duration, delay]);

  return value;
}

/* ─── COMPONENTS ─── */

function SectionTitle({ children }) {
  return <div style={styles.sectionTitle}>{children}</div>;
}

function StatCard({ icon, label, value, suffix = "", badge, badgeColor, delay = 0 }) {
  const count = useCountUp(typeof value === "number" ? value : 0, 900, 200 + delay);

  return (
    <div style={styles.statCard}>
      <div style={styles.statLabelRow}>
        <span>{icon}</span>
        <span>{label}</span>
        {badge && (
          <span
            style={{
              ...styles.badge,
              ...(badgeColor === "green" ? styles.badgeGreen : styles.badgePurple),
              marginLeft: "auto",
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div style={styles.statValue}>
        {typeof value === "number" ? count.toLocaleString() : value}
        {suffix && <span style={styles.suffix}>{suffix}</span>}
      </div>
    </div>
  );
}

function ProgressBar({ pct, color }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 300);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div style={styles.progressTrack}>
      <div style={{ ...styles.progressFill, width: `${width}%`, background: color }} />
    </div>
  );
}

function ChallengeCard({ icon, iconBg, title, sub, desc, pct, barColor, tag, tagStyle }) {
  return (
    <div style={styles.challengeCard}>
      <div style={styles.cardTop}>
        <div style={{ ...styles.cardIcon, background: iconBg }}>{icon}</div>

        <div>
          <div style={styles.cardTitle}>{title}</div>
          <div style={styles.cardSub}>{sub}</div>
        </div>

        <span style={{ ...styles.tagBase, ...tagStyle, marginLeft: "auto" }}>{tag}</span>
      </div>

      <div style={styles.cardDesc}>{desc}</div>

      <ProgressBar pct={pct} color={barColor} />

      <div style={styles.progLabel}>
        <span>Progress</span>
        <span>{pct}%</span>
      </div>
    </div>
  );
}


/* ─── MAIN DASHBOARD ─── */

export default function Dashboard() {

  const challenges = [
    {
      icon: "⚔️",
      iconBg: "#EEEDFE",
      title: "Daily Challenge",
      sub: "Updated 2h ago",
      desc: "Two Sum Variants — explore hashing strategies",
      pct: 70,
      barColor: "#7F77DD",
      tag: "Medium",
      tagStyle: styles.tagMed,
    },
    {
      icon: "🔥",
      iconBg: "#FAECE7",
      title: "DSA Arena",
      sub: "12 participants",
      desc: "Live competition — Segment Trees",
      pct: 40,
      barColor: "#D85A30",
      tag: "Hard",
      tagStyle: styles.tagHard,
    },
    {
      icon: "📦",
      iconBg: "#E1F5EE",
      title: "Code Vault",
      sub: "34 snippets saved",
      desc: "Saved solutions and templates",
      pct: 90,
      barColor: "#1D9E75",
      tag: "Easy",
      tagStyle: styles.tagEasy,
    },
    {
      icon: "🔁",
      iconBg: "#FAEEDA",
      title: "Learning Loop",
      sub: "Due today: 5",
      desc: "Spaced revision — Dynamic Programming",
      pct: 55,
      barColor: "#BA7517",
      tag: "Medium",
      tagStyle: styles.tagMed,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex", score: 2450 },
    { rank: 2, name: "Sarah", score: 2310 },
    { rank: 3, name: "You", score: 1240 },
    { rank: 4, name: "Jordan", score: 1190 },
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.content}>

        {/* STATS */}
        <SectionTitle>📊 Overview</SectionTitle>
        <div style={styles.statGrid}>
          <StatCard icon="🔥" label="Streak" value={12} suffix=" days" />
          <StatCard icon="⭐" label="Points" value={1240} badge="Top 10%" />
          <StatCard icon="📘" label="Solved" value={86} />
          <StatCard icon="🏆" label="Rank" value="#142" />
        </div>

        {/* CHALLENGES */}
        <SectionTitle>⚔️ Active Challenges</SectionTitle>
        <div style={styles.cardGrid}>
          {challenges.map((c, i) => (
            <ChallengeCard key={i} {...c} />
          ))}
        </div>

        {/* BOTTOM */}
        <SectionTitle>📈 Insights</SectionTitle>
        <div style={styles.bottomGrid}>

          <div style={styles.panel}>
            <div style={styles.panelTitle}>⚡ Recent Activity</div>
            <div style={styles.activityItem}>Solved Binary Search</div>
            <div style={styles.activityItem}>Joined Arena</div>
            <div style={styles.activityItem}>Saved BFS template</div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelTitle}>🏆 Leaderboard</div>
            {leaderboard.map((l, i) => (
              <div key={i} style={styles.lbRow}>
                <span>{l.rank}</span>
                <span style={{ flex: 1 }}>{l.name}</span>
                <span>{l.score}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

/* ─── STYLES ─── */

const styles = {
  wrapper: {
  minHeight: "100vh",
  width: "100%",
  background: "#f4f6fb",
  fontFamily: "Inter, sans-serif",
  overflowX: "hidden",
},

  content: {
  width: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: 18,
},

  sectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#666",
    marginTop: 10,
  },

  statGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 16,
},

  statCard: {
    background: "white",
    padding: 12,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  },

  statLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: "#777",
  },

  statValue: {
    fontSize: 22,
    fontWeight: 600,
    marginTop: 6,
  },

  suffix: {
    fontSize: 12,
    marginLeft: 4,
    color: "#888",
  },

  badge: {
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 20,
  },

  badgeGreen: { background: "#EAF3DE", color: "#3B6D11" },
  badgePurple: { background: "#EEEDFE", color: "#534AB7" },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 10,
  },

  challengeCard: {
    background: "white",
    padding: 14,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    minWidth: 0,
  },

  cardTop: { display: "flex", gap: 10, marginBottom: 8 },

  cardIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: { fontSize: 13, fontWeight: 600 },
  cardSub: { fontSize: 10, color: "#888" },
  cardDesc: { fontSize: 12, color: "#555", marginBottom: 10 },

  tag: {
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 20,
  },

tagEasy: {
  background: "#EAF3DE",
  color: "#3B6D11",
  borderColor: "#CFE6B8",
},

tagMed: {
  background: "#FAEEDA",
  color: "#8A4B00",
  borderColor: "#F3D3A1",
},

tagHard: {
  background: "#FCEBEB",
  color: "#8B1E1E",
  borderColor: "#F5B5B5",
},

  progressTrack: {
    height: 5,
    background: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
    transition: "width 0.8s ease",
  },

  progLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#777",
    marginTop: 6,
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 10,
  },

  panel: {
    background: "white",
    padding: 14,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  },

  panelTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 10,
  },

  activityItem: {
    fontSize: 12,
    padding: "6px 0",
    color: "#555",
  },

  lbRow: {
    display: "flex",
    gap: 10,
    fontSize: 12,
    padding: "6px 0",
  },
  tagBase: {
  fontSize: 10,
  padding: "3px 8px",
  borderRadius: 999,
  fontWeight: 600,
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid transparent",
},

};