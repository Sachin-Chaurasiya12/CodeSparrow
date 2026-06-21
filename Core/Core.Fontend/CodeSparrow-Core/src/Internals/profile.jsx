// import React from "react";
import React, { useEffect, useState } from "react";


export default function ProfilePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/flag/images"
      );

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

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f7fb;
        }

        .header {
          height: 180px;
          background: linear-gradient(135deg, #4c6ef5, #3b5bdb);
        }

        .container {
          max-width: 1000px;
          margin: -80px auto 40px;
          display: flex;
          gap: 20px;
          padding: 0 20px;
        }

        .profile-card {
          width: 280px;
          background: white;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .avatar {
          width: 100px;
          border-radius: 50%;
          margin-top: -60px;
          border: 5px solid white;
        }

        .profile-card h3 {
          margin: 10px 0 5px;
        }

        .profile-card p {
          color: gray;
          font-size: 14px;
        }

        .stats {
          margin-top: 20px;
          text-align: left;
        }

        .stats div {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          font-size: 14px;
        }

        .outline-btn {
          margin-top: 15px;
          padding: 8px;
          width: 100%;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
        }

        .primary-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background: #3b5bdb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .content {
          flex: 1;
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .tabs {
          display: flex;
          gap: 20px;
          border-bottom: 1px solid #ddd;
          margin-bottom: 20px;
        }

        .tabs div {
          padding-bottom: 10px;
          cursor: pointer;
          color: gray;
        }

        .tabs .active {
          color: #3b5bdb;
          border-bottom: 2px solid #3b5bdb;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        label {
          font-size: 13px;
          color: gray;
        }

        input, select {
          width: 90%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="header" />

      <div className="container">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src="https://i.pravatar.cc/150"
            alt="avatar"
            className="avatar"
          />
          <h3>Nathaniel Poole</h3>
          <p>Microsoft Inc.</p>

          <div className="stats">
            <div><span>Code Snippets</span><b>32</b></div>
            <div><span>Problem Solved</span><b>26</b></div>
          </div>

          <button className="outline-btn">View Public Profile</button>
        </div>

        {/* Content */}
        <div className="content">
          <div className="tabs">
            <div className="active">Account Settings</div>
          </div>

          <form className="form-grid">
            <div>
              <label>Username</label>
              <input type="text" />
            </div>

            <div>
              <label>Name</label>
              <input type="text" />
            </div>

            <div>
              <label>Phone Number</label>
              <input type="text" />
            </div>

            <div>
              <label>Email Address</label>
              <input type="email" />
            </div>

            <div>
              <label>City</label>
              <input type="text" />
            </div>

            <div>
              <label>State</label>
              <input type="text" />
            </div>

            <div>
              <label>Bio</label>
              <input type="text" />
            </div>

            <div>
              <label>Country</label>
              <select>
                <option value="">Select Country</option>
                {countries.map((c, index) => (
                  <option key={index} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              
            </div>
          </form>

          <button className="primary-btn">Update</button>
        </div>
      </div>
    </>
  );
}
