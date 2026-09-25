import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { GlobalContext } from "../context/Context";

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (e) => { e.preventDefault(); setLoading(true); try { const result = await axios.post("/api/v1/login", { email, password }, { withCredentials: true }); dispatch({ type: "USER_LOGIN", user: result.data.user }); } catch (error) { alert(error.response?.data?.message || "Something went wrong"); } finally { setLoading(false); } };
  return <main className="center-page"><section className="card auth-card"><div className="logo">Ecom Store</div><h1>Welcome back</h1><p className="subtext">Login to your account</p><form onSubmit={login}><label>Email address<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /></label><label>Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /></label><button disabled={loading}>{loading ? "Logging in..." : "Login"}</button></form><p className="switch-text">Don't have an account? <Link to="/signup">Signup</Link></p></section></main>;
};
export default Login;
