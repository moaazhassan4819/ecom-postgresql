import React, { useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/Context";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const logout = async () => {
    try {
      await axios.post("/api/v1/logout", {}, { withCredentials: true });
      dispatch({ type: "USER_LOGOUT" });
    } catch (error) { console.log("Logout Error:", error); }
  };
  return <main className="center-page"><section className="card dashboard-card"><div className="logo">Ecom Store</div><h1>Welcome, {state.user?.first_name}</h1><p className="subtext">You are logged in successfully.</p><div className="user-details"><p><span>Email</span>{state.user?.email}</p><p><span>Role</span>{state.user?.role}</p><p><span>Phone</span>{state.user?.phone}</p></div><button onClick={logout}>Logout</button></section></main>;
};
export default Home;
