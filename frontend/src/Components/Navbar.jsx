import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";

function NavBar() {
  const [status, setStatus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setStatus(true) : setStatus(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setStatus(false);
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

            {status ? (
              <li className="profile-dropdown" style={{ position: "relative", cursor: "pointer" }}>
                 <CgProfile size={20}/>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                  </li>
                </ul>
              </li>
            ) : (
              <li id="lg-bag">
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  <CiLogin /> Login
                </NavLink>
              </li>
            )}



          </ul>
        </nav>
      </section>
    </>
  );
}

export default NavBar;
