import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [status, setStatus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setStatus(!!token); // shorthand for setting true/false based on token presence
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <section className="nav-bar-header">
        <div className="nav-bar-logo">
          <NavLink to="/">
          </NavLink>
        </div>

        {/* Hamburger Menu Button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav>
          <ul className={`Nav-Bar-links ${menuOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Courses" onClick={() => setMenuOpen(false)}> Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/live-classess" onClick={() => setMenuOpen(false)}>
                Live Sessions
              </NavLink>
            </li>


            {/* {status ? (
            <li>
              <i
                id="signin"
                className="fa-solid fa-arrow-right-from-bracket"
                onClick={handleLogout}
              ></i> Logout
            </li>
          ) : (
            
          )} */}
            <li id="lg-bag">
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                <i className="fa-solid fa-user"></i> Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}

export default NavBar;
