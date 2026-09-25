import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { GlobalContext } from "../context/Context";

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch({ type: "USER_LOGIN", user: response.data.user });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Welcome</span>
          <h1>Sign in to ShopEase</h1>
          <p>Discover better deals and manage your store favorites in one place.</p>
        </div>

        <form onSubmit={login} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <button type="submit" className="primary-btn full-width">Login</button>

          <p className="switch-link">
            New here? <Link to="/signup">Create account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
