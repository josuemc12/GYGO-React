// import React from "react";
// import {
//   BrowserRouter,
//   Route,
//   Routes,
//   NavLink,
//   Navigate,
// } from "react-router-dom";
//import { DashboardGroupPage } from "../Pages/DashboardGroupPage";
//import { ProjectsPage } from "../Pages/ProjectsPage";
// import { ChangePasswordPage } from "../Pages/ChangePasswordPage";
// import { AddGroupSAPage } from "../Pages/AddGroupSAPage";
// import Login from "../Pages/Login";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   Avatar,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// export const NavBar = () => {
//   return (
//     <div>
//       <nav
//         className="navbar navbar-expand-lg px-3"
//         style={{ height: "70px", width: "100%" }}
//       >
//         <div className="container-fluid d-flex align-items-center">
//           {/* Logo */}

//           <a href="/DashboardGroupPage" className="me-4">
//             <img
//               src="/src/assets/LogoBlanco.png"
//               alt="Logo"
//               style={{
//                 height: "100%",
//                 maxHeight: "150px",
//                 width: "auto",
//                 objectFit: "contain",
//               }}
//             />
//           </a>

//           <div
//             className="collapse navbar-collapse justify-content-center"
//             id="navbarNavDropdown"
//           >
//             <ul className="navbar-nav mx-auto">
//               <li className="nav-item">
//                 <NavLink className="nav-link " to="/ProjectsPage">
//                   Proyectos
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#"></a>
//               </li>
//             </ul>

//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import "../styles/Header.css"; // Asegúrate de tener este archivo CSS
import { ProjectsPage } from "../Pages/ProjectsPage";
import { DashboardGroupPage } from "../Pages/DashboardGroupPage";

export const PrivateHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".header")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Cerrar menú al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-small">
            <a href="/DashboardGroupPage" className="me-4">
              <img
                src="src\assets\Logo.png"
                alt="Green On Logo"
                className="logo-image"
              />
              <span>Green On</span>
            </a>
          </div>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <ul className="nav-list">
              <li>
                <a href="#servicios" onClick={closeMenu}>
                  Servicios
                </a>
              </li>
              <li>
                <a href="#certificaciones" onClick={closeMenu}>
                  Certificaciones
                </a>
              </li>
              <li>
                <a href="#eventos" onClick={closeMenu}>
                  Eventos
                </a>
              </li>
              <li>
                <a href="#contactos" onClick={closeMenu}>
                  Contactos
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
