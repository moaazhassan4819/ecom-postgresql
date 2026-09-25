import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/signup", {
        firstName,
        lastName,
        email,
        password,
        phone,
        isSeller
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card sign-up-card">
        <div className="auth-copy">
          <span className="eyebrow">New account</span>
          <h1>Create your ShopEase account</h1>
          <p>Join in a few quick steps and start shopping or selling with ease.</p>
        </div>

        <form onSubmit={signUp} className="auth-form">
          <div className="two-col">
            <label>
              First name
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </label>

            <label>
              Last name
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </label>
          </div>

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <label>
            Phone
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" />
          </label>

          <label className="checkbox-row">
            <input type="checkbox" checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)} />
            Signup as seller
          </label>

          <button type="submit" className="primary-btn full-width">Create account</button>

          <p className="switch-link">
            Already a member? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
