import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { ProjectsPage } from "./Pages/ProjectsPage";
import { DashboardGroupPage } from "./Pages/DashboardGroupPage";

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
                  <NavLink className="nav-link active" to="/DashboardGroupPage">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link active" to="/ProjectsPage">
                  Proyectos
                  </NavLink>

                </li>

                <li className="nav-item">
                  <a className="nav-link" href="">
                    ????????????
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
            </div>
          </div>
          </nav>
           <Routes>
            <Route path="/ProjectsPage" element={<ProjectsPage />} />
            <Route path="/DashboardGroupPage" element={<DashboardGroupPage/>}></Route>
           </Routes>
          

      </div>
    </BrowserRouter>
  );
}

export default App;
