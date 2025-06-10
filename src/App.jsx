import { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink,Navigate,useLocation  } from "react-router-dom";
import { DashboardGroupPage } from './Pages/DashboardGroupPage'
import { ProjectsPage } from "./Pages/ProjectsPage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
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
  const hideNavbar = location.pathname === "/Login";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<DashboardGroupPage />} />
        <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
        <Route path="/ProjectsPage" element={<ProjectsPage />} />
        <Route path="/AddGroup" element={<AddGroupSAPage />} />
        <Route path="/ChangePassword" element={<ChangePasswordPage />} />
      </Routes>
    </>
  );
}


export default App;