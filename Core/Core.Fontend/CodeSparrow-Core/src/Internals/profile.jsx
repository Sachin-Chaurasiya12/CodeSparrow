import React, { useEffect, useState } from "react";

export default function ProfileApp() {
  const [currentPage, setCurrentPage] = useState("profile");
  const [countries, setCountries] = useState([]);
  const [bannerImage, setBannerImage] = useState("linear-gradient(135deg, #667eea 0%, #764ba2 35%, #f093fb 100%)");

  const [profileData, setProfileData] = useState({
    name: "Nathaniel Poole",
    username: "npoole",
    email: "nathaniel.poole@microsoft.com",
    phone: "+1 (425) 555-0172",
    city: "Redmond",
    state: "Washington",
    country: "United States",
    bio: "Full-stack developer passionate about building scalable applications",
    company: "Microsoft Inc.",
    codeSnippets: 32,
    problemsSolved: 26,
    joinDate: "Joined March 2023",
    avatar: "https://i.pravatar.cc/150"
  });

  const [formData, setFormData] = useState(profileData);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
        const result = await res.json();
        const formatted = result.data
          .map((c) => ({
            name: c.name,
            flag: c.flag,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImage(`url('${event.target.result}')`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfileData(formData);
    setCurrentPage("profile");
  };

  const handleCancel = () => {
    setFormData(profileData);
    setCurrentPage("profile");
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #f5f7fb 0%, #e9ecf1 100%);
          min-height: 100vh;
        }

        .page-container {
          min-height: 100vh;
          padding: 40px 20px;
        }

        .header-banner {
          height: 320px;
          background: var(--banner-bg, linear-gradient(135deg, #667eea 0%, #764ba2 35%, #f093fb 100%));
          background-size: cover;
          background-position: center;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          margin: 0 auto 0;
          max-width: 1200px;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
        }

        .header-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 1;
        }

        .banner-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 70px;
          z-index: 3;
        }

        .banner-text {
          color: white;
          max-width: 550px;
        }

        .banner-text h1 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 16px 0;
          letter-spacing: -1px;
          line-height: 1.2;
        }

        .banner-text p {
          font-size: 17px;
          margin: 0;
          opacity: 0.92;
          line-height: 1.6;
          font-weight: 300;
        }

        .banner-decoration {
          position: absolute;
          right: 70px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
        }

        .banner-circle {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 70px;
          box-shadow: inset 0 8px 20px rgba(255, 255, 255, 0.1), 0 8px 20px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          animation: pulse-banner 3s ease-in-out infinite;
        }

        @keyframes pulse-banner {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .banner-upload-btn {
          position: absolute;
          bottom: 20px;
          right: 70px;
          z-index: 4;
        }

        .banner-upload-input {
          display: none;
        }

        .upload-btn {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.25);
          color: white;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .upload-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 80px auto 0;
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 40px;
          padding: 0 20px;
        }

        @media (max-width: 968px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            margin-top: 60px;
          }
        }

        /* Profile View */
        .profile-card {
          background: white;
          border-radius: 16px;
          padding: 60px 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          text-align: center;
          position: relative;
          margin-top: 0;
          height: fit-content;
          position: sticky;
          top: 40px;
        }

        @media (max-width: 968px) {
          .profile-card {
            position: static;
            top: auto;
            padding: 50px 35px;
          }
        }

        .avatar-container {
          position: relative;
          margin-bottom: 25px;
        }

        .avatar {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 6px solid white;
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.35);
          margin: 0 auto;
          object-fit: cover;
        }

        .profile-card h2 {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 20px 0 10px 0;
        }

        .profile-card .company {
          font-size: 16px;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 22px;
        }

        .profile-card .bio {
          font-size: 15px;
          color: #666;
          line-height: 1.7;
          margin-bottom: 32px;
          min-height: 50px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 35px 0;
          padding: 35px 0;
          border-top: 2px solid #f0f0f0;
          border-bottom: 2px solid #f0f0f0;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          font-weight: 600;
        }

        .join-date {
          font-size: 14px;
          color: #999;
          margin-top: 25px;
          padding-top: 25px;
          border-top: 2px solid #f0f0f0;
          font-weight: 500;
        }

        .btn-primary {
          width: 100%;
          padding: 13px 24px;
          margin-top: 25px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-secondary {
          width: 100%;
          padding: 13px 24px;
          margin-top: 12px;
          background: #f5f7fb;
          color: #667eea;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #e9ecf1;
          border-color: #667eea;
          transform: translateY(-1px);
        }

        .btn-secondary:active {
          transform: translateY(0);
        }

        /* Settings View */
        .settings-container {
          background: white;
          border-radius: 16px;
          padding: 50px 45px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          margin-top: 0;
        }

        @media (max-width: 968px) {
          .settings-container {
            padding: 40px 30px;
          }
        }

        .settings-header {
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 2px solid #f0f0f0;
        }

        .settings-header h2 {
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .settings-header p {
          font-size: 15px;
          color: #999;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 35px;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 13px 16px;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
          color: #333;
          background: white;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: white;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #ccc;
        }

        .form-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 20px;
          padding-right: 35px;
        }

        .button-group {
          display: flex;
          gap: 20px;
          margin-top: 45px;
          padding-top: 35px;
          border-top: 2px solid #f0f0f0;
        }

        @media (max-width: 600px) {
          .button-group {
            flex-direction: column;
          }
        }

        .btn-save {
          flex: 1;
          padding: 15px 35px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-save:active {
          transform: translateY(0);
        }

        .btn-cancel {
          flex: 1;
          padding: 15px 35px;
          background: #f5f7fb;
          color: #667eea;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-cancel:hover {
          background: #e9ecf1;
          border-color: #667eea;
          transform: translateY(-1px);
        }

        .btn-cancel:active {
          transform: translateY(0);
        }

        @media (max-width: 968px) {
          .header-banner {
            height: 260px;
            border-radius: 20px;
          }

          .banner-content {
            padding: 0 50px;
          }

          .banner-text h1 {
            font-size: 38px;
          }

          .banner-text p {
            font-size: 15px;
          }

          .banner-decoration {
            right: 50px;
          }

          .banner-circle {
            width: 130px;
            height: 130px;
            font-size: 55px;
          }
        }

        @media (max-width: 640px) {
          .header-banner {
            height: 240px;
            border-radius: 16px;
          }

          .banner-content {
            padding: 0 30px;
            flex-direction: column;
            justify-content: center;
          }

          .banner-text h1 {
            font-size: 28px;
            margin-bottom: 10px;
          }

          .banner-text p {
            font-size: 13px;
          }

          .banner-decoration {
            position: static;
            transform: none;
            margin-top: 20px;
          }

          .banner-circle {
            width: 100px;
            height: 100px;
            font-size: 40px;
          }

          .banner-upload-btn {
            bottom: 15px;
            right: 30px;
          }

          .upload-btn {
            padding: 8px 16px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="page-container">
        {/* Header Banner */}
        <div 
          className="header-banner"
          style={{ 
            '--banner-bg': bannerImage
          }}
        >
          <div className="banner-content">
            <div className="banner-text">
              <h1>Welcome Back!</h1>
              <p>{currentPage === "profile" ? "View your profile and achievements" : "Update your profile information"}</p>
            </div>
            
          </div>
          {currentPage === "settings" && (
            <div className="banner-upload-btn">
              <input
                type="file"
                id="bannerInput"
                className="banner-upload-input"
                accept="image/*"
                onChange={handleBannerUpload}
              />
              <label htmlFor="bannerInput" className="upload-btn">
                Upload Banner
              </label>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="content-wrapper">
          {/* Left Sidebar - Profile Card */}
          <div className="profile-card">
            <div className="avatar-container">
              <img src={profileData.avatar} alt="Profile" className="avatar" />
            </div>
            <h2>{profileData.name}</h2>
            <p className="company">{profileData.company}</p>
            <p className="bio">{profileData.bio}</p>

            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{profileData.codeSnippets}</span>
                <span className="stat-label">Snippets</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profileData.problemsSolved}</span>
                <span className="stat-label">Solved</span>
              </div>
            </div>

            <p className="join-date">{profileData.joinDate}</p>

            {currentPage === "profile" ? (
              <button className="btn-primary" onClick={() => setCurrentPage("settings")}>
                Edit Profile
              </button>
            ) : (
              <button className="btn-secondary" onClick={() => setCurrentPage("profile")}>
                Back to Profile
              </button>
            )}
          </div>

          {/* Right Content Area */}
          {currentPage === "profile" ? (
            // Profile View
            <div className="settings-container">
              <div className="settings-header">
                <h2>About</h2>
                <p>View your profile information and achievements</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "15px" }}>
                    Personal Information
                  </h3>
                </div>

                <div>
                  <p style={{ fontSize: "12px", color: "#999", marginBottom: "5px", textTransform: "uppercase", fontWeight: "500" }}>
                    Email
                  </p>
                  <p style={{ fontSize: "15px", color: "#333", fontWeight: "500" }}>{profileData.email}</p>
                </div>

                <div>
                  <p style={{ fontSize: "12px", color: "#999", marginBottom: "5px", textTransform: "uppercase", fontWeight: "500" }}>
                    Phone
                  </p>
                  <p style={{ fontSize: "15px", color: "#333", fontWeight: "500" }}>{profileData.phone}</p>
                </div>

                <div>
                  <p style={{ fontSize: "12px", color: "#999", marginBottom: "5px", textTransform: "uppercase", fontWeight: "500" }}>
                    City
                  </p>
                  <p style={{ fontSize: "15px", color: "#333", fontWeight: "500" }}>{profileData.city}</p>
                </div>

                <div>
                  <p style={{ fontSize: "12px", color: "#999", marginBottom: "5px", textTransform: "uppercase", fontWeight: "500" }}>
                    State
                  </p>
                  <p style={{ fontSize: "15px", color: "#333", fontWeight: "500" }}>{profileData.state}</p>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontSize: "12px", color: "#999", marginBottom: "5px", textTransform: "uppercase", fontWeight: "500" }}>
                    Country
                  </p>
                  <p style={{ fontSize: "15px", color: "#333", fontWeight: "500" }}>{profileData.country}</p>
                </div>
              </div>
            </div>
          ) : (
            // Settings View
            <div className="settings-container">
              <div className="settings-header">
                <h2>Account Settings</h2>
                <p>Update your profile information</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                  />
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <select name="country" value={formData.country} onChange={handleInputChange}>
                    <option value="">Select Country</option>
                    {countries.map((c, index) => (
                      <option key={index} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter company"
                  />
                </div>

                <div className="form-group full">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="button-group">
                <button className="btn-save" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}