import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { DashboardGroupPage } from '../Pages/DashboardGroupPage'
import { ProjectsPage } from "../Pages/ProjectsPage";
import { ChangePasswordPage } from "../Pages/ChangePasswordPage";
import { AddGroupSAPage } from "../Pages/AddGroupSAPage";


export const NavBar = () => {


    return(
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
            <Route path="/AddGroup" element={<AddGroupSAPage />}></Route>
            <Route path="/ChangePassword" element={<ChangePasswordPage />}></Route> 
           </Routes>
          

      </div>
    </BrowserRouter>
    )
}