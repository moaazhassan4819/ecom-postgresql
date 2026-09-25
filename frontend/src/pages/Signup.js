import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Signup = () => {
  const [firstName, setFirstName] = useState(""); const [lastName, setLastName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [phone, setPhone] = useState(""); const [isSeller, setIsSeller] = useState(false);
  const signUp = async (e) => {
    e.preventDefault();
    try { const response = await axios.post("/api/v1/signup", { firstName, lastName, email, password, phone, isSeller }); alert(response.data.message); }
    catch (error) { alert(error.response?.data?.message || "Something went wrong"); }
  };
  return <div><h1>Signup</h1><form onSubmit={signUp}><div><label>First Name</label><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div><br /><div><label>Last Name</label><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div><br /><div><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div><br /><div><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div><br /><div><label>Phone</label><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /></div><br /><div><label><input type="checkbox" checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)} /> Signup as Seller</label></div><br /><button type="submit">Signup</button></form><br /><Link to="/login">Already have an account? Login</Link></div>;
};
export default Signup;
