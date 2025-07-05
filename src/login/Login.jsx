import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://fastapi-saas-1-520799875010.asia-south1.run.app/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      // Store the token in localStorage
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/landing"); // Change '/landing' to your actual landing route
      }, 1000);
    } else {
      setError(data.detail || data.message || "Login failed");
    }
  } catch {
    setError("Network error");
  }
};

  // ...existing code...
return (
  <div className="home">
    <div className="container">
      <form className="myform" onSubmit={handleSubmit}>
        <h3>
        Take Control the <em>AI!</em>  by Login
        </h3>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="mydiv">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Link to="/reset-password">Reset Password</Link>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}
          <div className="second-div">
            <button type="submit">Login</button>
            <p>
              Not Having Account <Link to='/signup'>Signup</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
);
};

export default Login;