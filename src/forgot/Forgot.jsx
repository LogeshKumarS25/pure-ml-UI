import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const API_URL = "https://fastapi-saas-1-520799875010.asia-south1.run.app/auth/reset-password";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) setSuccess("Password reset successful!");
      else setError(data.detail || data.message || "Reset failed");
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="home">
      <div className="container">
        <form className="myform" onSubmit={handleSubmit}>
          <h3>
            Hi <em>👋</em>, <br /> Reset Password!
          </h3>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}
            <div className="second-div">
              <button type="submit">Send</button>
              <p>
                <Link to="/" color="blue">Login Instead</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;