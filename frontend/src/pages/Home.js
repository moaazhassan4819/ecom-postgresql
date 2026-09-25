import React, { useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/Context";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const logout = async () => {
    try {
      await axios.post("/api/v1/logout", {}, { withCredentials: true });
      dispatch({ type: "USER_LOGOUT" });
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <div className="page-shell">
      <nav className="topbar">
        <div className="brand">ShopEase</div>
        <div className="nav-actions">
          <span className="nav-pill">Orders</span>
          <span className="nav-pill">Wishlist</span>
          <button className="ghost-btn" onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="content-wrap">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>Hello, {state.user?.first_name || "User"}</h1>
            <p className="muted-text">
              Your daily essentials and trending picks are ready for you.
            </p>
          </div>
          <button className="primary-btn">Shop now</button>
        </section>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Orders</span>
            <strong>24</strong>
          </div>
          <div className="stat-card">
            <span>Wallet</span>
            <strong>$1,280</strong>
          </div>
          <div className="stat-card">
            <span>Support</span>
            <strong>Online</strong>
          </div>
        </div>

        <section className="products-section">
          <div className="section-head">
            <h2>Popular products</h2>
            <span>View all</span>
          </div>

          <div className="products-grid">
            <article className="product-card">
              <div className="product-image gradient-one" />
              <h3>Air Max</h3>
              <p>Smart comfort shoes</p>
              <div className="card-footer">
                <strong>$120</strong>
                <button>Add</button>
              </div>
            </article>

            <article className="product-card">
              <div className="product-image gradient-two" />
              <h3>Audio Pro</h3>
              <p>Wireless sound</p>
              <div className="card-footer">
                <strong>$85</strong>
                <button>Add</button>
              </div>
            </article>

            <article className="product-card">
              <div className="product-image gradient-three" />
              <h3>Urban Bag</h3>
              <p>Minimal everyday carry</p>
              <div className="card-footer">
                <strong>$65</strong>
                <button>Add</button>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
