import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const API_URL = "https://fastapi-saas-1-520799875010.asia-south1.run.app/auth/register";

// List of Indian states and union territories
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirm,
          state,
          phone,
        }),
      });
      const data = await res.json();
      if (res.ok) setSuccess("Signup successful!");
      else setError(data.detail || data.message || "Signup failed");
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="home">
      <div className="container">
        <form className="myform" onSubmit={handleSubmit}>
          <h3>
            Hi, Are You Ready to Control the <em>AI!</em> by Signup
          </h3>
          <div>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <select
              className="styled-select"
              required
              value={state}
              onChange={e => setState(e.target.value)}
            >
              <option value="">Select State</option>
              {indianStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="Phone"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <div className="mydiv">
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="mydiv">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
            </div>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
            <div className="second-div">
              <button type="submit">Signup</button>
              <p>
                Already Having Account? <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;