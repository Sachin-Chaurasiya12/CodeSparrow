import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Loader.css";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      setAuthenticated(false);
      return;
    }

    const refreshAccessToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/auth/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setAuthenticated(false);
          return;
        }

        localStorage.setItem("accessToken", data.accessToken);
        setAuthenticated(true);
      } catch (error) {
        console.error("FULL ERROR:", error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setAuthenticated(false);
      }
    };

    refreshAccessToken();
  }, []);

  // Loading while refresh request is running
 if (authenticated === null) {
  return (
    <div className="loader-overlay">
  <div className="dashboard-loader">
    <div className="loader-spinner"></div>
    <p className="loader-text">Loading...</p>
  </div>
</div>
  );
}

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}