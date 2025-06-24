import { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink,Navigate,useLocation  } from "react-router-dom";
import { DashboardGroupPage } from './Pages/DashboardGroupPage'
import { ProjectsPage } from "./Pages/ProjectsPage";
import { ConsumptionPage } from "./Pages/ConsumptionPage";
import { MonthlyConsumptionPage } from "./Pages/MonthlyConsumPage";
import { AddConsumptionPage } from "./Pages/AddConsumptionPage";
import { MonthlyHistoryPage } from "./Pages/MonthlyHistoryPage";
import { AddMonthlyConsumPage } from "./Pages/AddMonthlyConsmPage";
import { UpdateMonthlyConsumPage } from "./Pages/UpdateMonthlyConsumPage";
import { UpdateConsumptionPage } from "./Pages/UpdateConsumptionPage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
import {ReportCompanies} from "./Pages/ReportCompaniesPage"
import {Register} from "./Pages/Register"
import {SendInvite} from "./Pages/SendInvite"
import {Verify2FA} from "./Pages/Verify2Fa"
import { ChatWindow } from "./Pages/ChatWindow";
import HomePage from "./Pages/HomePage";
import "../src/App.css";
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


  const hideNavbar = ["/Login", "/Verify2FA"].includes(location.pathname);


  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Navigate to="/Login" replace />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/SendInvite" element={<SendInvite />} />
        <Route path="/Verify2FA" element={<Verify2FA />} />
        <Route path="/DashboardGroupPage" element={<DashboardGroupPage />} />
        <Route path="/ProjectsPage" element={<ProjectsPage />} />
        <Route path="/AddGroup" element={<AddGroupSAPage />} />
        <Route path="/consumption" element={<ConsumptionPage/>} />
        <Route path="/consumption/monthly/:id" element={<MonthlyConsumptionPage/>} />
        <Route path="/consumption/edit/:id" element={<UpdateConsumptionPage/>} />
        <Route path="/consumption/monthly/history/:id" element={<MonthlyHistoryPage/>} />
        <Route path="/consumption/add" element={<AddConsumptionPage/>} />
        <Route path="/consumption/monthly/edit/:consumptionId/:monthlyId" element={<UpdateMonthlyConsumPage/>} />
        <Route path="/consumption/monthly/add/:consumptionId" element={<AddMonthlyConsumPage/>} />
        <Route path="/ChangePassword" element={<ChangePasswordPage />} />
        <Route path="/Chat" element={<ChatWindow/>} />
          {/*Rutas de los reportes*/}
        <Route path="/ReportCompanies" element={<ReportCompanies />} />
      </Routes>
    </>
  );
}


export default App;