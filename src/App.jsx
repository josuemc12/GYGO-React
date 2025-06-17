import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { ProjectsPage } from "./Pages/ProjectsPage";
import  Login  from "./Pages/Login";

import RegisterPage from './Pages/Register';
import TwoFactorPage from './pages/Verify2Fa';
import InvitePage from './Pages/SendInvite';


import SignInButton from "./components/LoginButton";
import DebugRoutes from './Pages/DevDebugRoute';


function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg p-3">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Logo */}
            <div className="ms-auto">
              <a href=" ">
                <img src="logo.png" alt="Logo" style={{ height: "40px" }} />
              </a>
            </div>

            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    ????????????
                  </a>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link active" to="/ProjectsPage">
                  Proyectos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="">
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="">
                    ?????????????
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#"></a>
                </li>
              </ul>

              <div><SignInButton/></div>
            </div>
          </div>
          </nav>
           <Routes>
            <Route path="/ProjectsPage" element={<ProjectsPage />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/:inviteToken" element={<RegisterPage />} />
            <Route path="/2fa" element={<TwoFactorPage />} />
            <Route path="/invite" element={<InvitePage />} />q
           </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
