import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Loader.css";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/auth/refresh",
          {
            method: "POST",
            credentials: "include", 
          }
        );

        if (!response.ok) {
          localStorage.removeItem("accessToken");
          setAuthenticated(false);
          return;
        }

        const data = await response.json();

        localStorage.setItem("accessToken", data.accessToken);

        setAuthenticated(true);
      } catch (error) {
        console.error("Refresh failed:", error);

        localStorage.removeItem("accessToken");

        setAuthenticated(false);
      }
    };

    refreshAccessToken();
  }, []);

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