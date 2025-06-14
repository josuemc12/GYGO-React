import { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink,Navigate,useLocation  } from "react-router-dom";
import { DashboardGroupPage } from './Pages/DashboardGroupPage'
import { ProjectsPage } from "./Pages/ProjectsPage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
import { LoginPrueba } from "./Pages/LoginPrueba";
import {ReportCompanies} from "./Pages/ReportCompaniesPage"

import Login from "./Pages/Login";
import "./App.css";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/LoginPrueba";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/" element={<Navigate to="/Login" replace />} /> */}
        <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
        <Route path="/ProjectsPage" element={<ProjectsPage />} />
        <Route path="/AddGroup" element={<AddGroupSAPage />} />
        <Route path="/ChangePassword" element={<ChangePasswordPage />} />
        <Route path="/LoginPrueba" element={<LoginPrueba />} />
        <Route path="/" element={<Navigate to="/LoginPrueba" replace />} />
          {/*Rutas de los reportes*/}
        <Route path="/ReportCompanies" element={<ReportCompanies />} />
      </Routes>
    </>
  );
}


export default App;