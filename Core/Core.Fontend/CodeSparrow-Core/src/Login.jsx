import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import bg from "./assets/loginimage.webp";
import logo from "./assets/CodeCabinateLogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});

  const showAlert = (msg, type) => {
    setAlert({ message: msg, type });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 3000);
  };

  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    navigate("/dashboard", { replace: true });
  }
  }, [navigate]);

  const handleLogin = async () => {
    let newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showAlert("Please fix the errors below", "error");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();

      localStorage.setItem("accessToken", data.accessToken);

      showAlert(data.message || "Login successful", "success");
      navigate("/dashboard");
    } catch (err) {
      showAlert("Invalid email or password", "error");
      setErrors({ email: "Check email", password: "Check password" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Enter key handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
          background: radial-gradient(circle at top left, #f8f8f8, #9de9bb);
        }

        #root { width: 100%; }
        * { box-sizing: border-box; }

        .auth-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 1000px;
          height: 600px;
          display: flex;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          background: white;
        }

        .left {
          flex: 1;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brand {
          font-weight: 800;
          font-size: 50px;
          gap:10px;
          margin-bottom: 30px;
          color: #6366f1;
          text-transform: uppercase;
        }

        h2 {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .sub {
          font-size: 15px;
          color: #666;
          margin-bottom: 25px;
        }

        input {
          width: 100%;
          padding: 14px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        input:focus {
          border-color: #6366f1;
          background: #fff;
        }

        .errorInput {
          border-color: #ef4444 !important;
          background: #fef2f2;
        }

        .errorInput:hover {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
        }

        .errorText {
          color: #dc2626;
          font-size: 12px;
          margin-top: -8px;
          margin-bottom: 10px;
          padding-left: 4px;
        }

        button {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: #111827;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .small {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
        }

        .small a {
          color: #6366f1;
          font-weight: 600;
        }

        .right {
          flex: 1.1;
          background-image: url(${bg});
          background-size: cover;
          background-position: center;
        }

        .alert {
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .alert.error {
          background: #fee2e2;
          color: #991b1b;
        }

        .alert.success {
          background: #dcfce7;
          color: #166534;
        }
        .brand {
          display: flex;
          align-items: center;
          font-weight: 800;
          font-size: 26px;
          margin-bottom: 5px;
          text-transform: uppercase;

          background: linear-gradient(
            135deg,
            #5748F7 0%,
            #7657F6 45%,
            #4C8DFF 100%
          );

          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .brand-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          
        }
        @media (max-width: 850px) {
          .right { display: none; }
          .auth-card { max-width: 450px; height: auto; }
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="left">
            <div className="brand">
              <img src={logo} alt="logo" className="brand-logo" />
              <span>Code Cabinate</span>
            </div>

            <h2>Welcome Back!</h2>
            <div className="sub">Let's get you signed in securely.</div>

            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: "" }));
              }}
              onKeyDown={handleKeyDown}
              className={errors.email ? "errorInput" : ""}
            />
            {errors.email && <div className="errorText">{errors.email}</div>}

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors(prev => ({ ...prev, password: "" }));
              }}
              onKeyDown={handleKeyDown}
              className={errors.password ? "errorInput" : ""}
            />
            {errors.password && <div className="errorText">{errors.password}</div>}

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Log In"}
            </button>

            <div className="small">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </div>

          <div className="right"></div>
        </div>
      </div>
    </>
  );
}

export default Login;