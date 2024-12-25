import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="header" data-header>
        <div className="overlay" data-overlay></div>
        <div className="header-top">
          <div className="container">
            <a href="tel:+01123456790" className="helpline-box">
              <div>
                <ion-icon name="call-outline"></ion-icon>
              </div>
              <div className="wrapper">
                <p className="helpline-title">For Further Inquires :</p>
                <p className="helpline-number">+01 (123) 4567 90</p>
              </div>
            </a>
            <Link to="/" className="logo">
              <h1 className="text-blue-600">TOURMATE</h1>
            </Link>
            <div className="header-btn-group">
              <button
                className="nav-open-btn"
                aria-label="Open Menu"
                data-nav-open-btn
              >
                <ion-icon name="menu-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <nav className="navbar" data-navbar>
              <div className="navbar-top">
                <Link to="/" className="logo">
                  <img src="../images/logo-blue.svg" alt="Tourly logo" />
                </Link>
                <button
                  className="nav-close-btn"
                  aria-label="Close Menu"
                  data-nav-close-btn
                >
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>
              <ul className="navbar-list">
                <li>
                  <Link to="/" className="navbar-link" data-nav-link>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/destination" className="navbar-link" data-nav-link>
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tourguilders"
                    className="navbar-link"
                    data-nav-link
                  >
                    Tour Guides
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 TOURMATE. All rights reserved.</p>
        </div>
      </footer>

      <a href="#top" className="go-top" data-go-top>
        <ion-icon name="chevron-up-outline"></ion-icon>
      </a>

      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default AppLayout;
