import React from "react";
import { Link } from "react-router-dom";
import ProductStore from "../../Store/ProductStore";

const AppNavbar = () => {
  const {SearchKeyword,SetSearchKeyword} =ProductStore()
  return (
    <>
      {/* ===== Topbar ===== */}
      <div className="container-fluid text-white p-2" style={{ backgroundColor: "#1F2937" }}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6">
              <span className="me-3 small">
                <i className="bi bi-envelope"></i> aminboni048@gmail.com
              </span>
              <span className="small">
                <i className="bi bi-telephone"></i> 01733427955
              </span>
            </div>

            <div className="col-md-6 text-end">
              <i className="bi bi-whatsapp mx-2" style={{ color: "#25D366", fontSize: "1.2rem" }}></i>
              <i className="bi bi-youtube mx-2" style={{ color: "#1877F2", fontSize: "1.2rem" }}></i>
              <i className="bi bi-facebook mx-2" style={{ color: "#1877F2", fontSize: "1.2rem" }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main Navbar ===== */}
      <nav className="navbar sticky-top navbar-expand-lg shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/">
            <img
              className="img-fluid"
              src="/logo.png"
              alt="Logo"
              width="110"
              height="auto"
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Links */}
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <Link className="nav-link fw-semibold text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link fw-semibold text-dark" to="/shop">Shop</Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link fw-semibold text-dark" to="/about">About</Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link fw-semibold text-dark" to="/contact">Contact</Link>
              </li>
            </ul>

            {/* ===== Search & Icons ===== */}
            <div className="d-flex align-items-center">
              {/* Search Box */}
              <div className="input-group">
                <input
                 onChange={(e)=>SetSearchKeyword(e.target.value)}
                  className="form-control"
                  type="search"
                  placeholder="Search products..."
                  aria-label="Search"
                />
                <Link to={SetSearchKeyword.length>0?`/by-Keyword/${SearchKeyword}`:'/'} className="btn btn-outline-secondary" type="submit">
                  <i className="bi bi-search"></i>
                </Link>
              </div>

              {/* Cart Button */}
              <Link
                to="/cart"
                type="button"
                className="btn ms-2 btn-light position-relative"
              >
                <i className="bi bi-bag text-dark"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  
                </span>
              </Link>

              {/* Wishlist */}
              <Link
                to="/wish"
                type="button"
                className="btn ms-2 btn-light d-flex"
              >
                <i className="bi bi-heart text-danger"></i>
              </Link>

              {/* Profile & Logout */}
              <Link
                type="button"
                className="btn ms-3 btn-primary d-flex text-white"
                to="/profile"
              >
                Profile
              </Link>
              <Link
                type="button"
                className="btn ms-2 btn-outline-primary d-flex"
                to="/logout"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavbar;
