// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";

///Iconos
import Icon from "@mui/material/Icon";

//Ruta del login
import Login from "./Pages/Public/Login";
//Ruta del inicio de sesion
import { Register } from "./Pages/Public/Register";
import {ReportCompanies} from "./Pages/Private/ReportCompaniesPage"

import AdminUserDashboard from "./Pages/AdminUserDashboard";
import AdminEmisionFactor from "./Pages/Admin/AdminEmisionFactor"



import  ProjectPage  from "./Pages/Private/ProjectsPage";
import {HomePage} from "./Pages/Public/HomePage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";
import { ConsumptionPage } from "./Pages/ConsumptionPage";
import { MonthlyConsumptionPage } from "./Pages/MonthlyConsumPage";
import { AddConsumptionPage } from "./Pages/AddConsumptionPage";
import { MonthlyHistoryPage } from "./Pages/MonthlyHistoryPage";
import { AddMonthlyConsumPage } from "./Pages/AddMonthlyConsmPage";
import { UpdateMonthlyConsumPage } from "./Pages/UpdateMonthlyConsumPage";
import { UpdateConsumptionPage } from "./Pages/UpdateConsumptionPage";
import IncidentsHistoryPage from "./Pages/IncidentHistoryPage";
import { ConfirmIncidentPage } from "./Pages/ConfirmIncidentPage/ConfirmIncidentPage";
import { ReportsEmissionsPage } from "./Pages/ReportsEmissionsPage";
import { DashboardGroupPage } from "./Pages/DashboardGroupPage";
import { UserProfilePage } from "./Pages/UserProfilePage";
import { GrupoProfilePage } from "./Pages/GroupProfilePage";
import { AddGroupSAPage } from "./Pages/AddGroupSAPage";
import SectorsIndexPage from "./Pages/SectorsPage";
import { UnitsIndexPage } from "./Pages/UnitsIndexPage";
import { SourcesIndexPage } from "./Pages/SourcesIndexPage";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "edit-monthly-consumption",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <DashboardGroupPage />,
  },
  {
    type: "collapse",
    name: "Proyectos",
    key: "Proyectos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/ProjectPage",
    component: <ProjectPage />,
  },
    {
    type: "collapse",
    name: "ChangePassword",
    key: "ChangePassword",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/ChangePasswordPage",
    component: <ChangePasswordPage />,
    hideInSidebar: true,
  },
  {
    name: "Admin Factor Emision",
    key: "AdminFactorEmision",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/AdminEmisionFactor",
    component: <AdminEmisionFactor />,
  },

    {
    type: "collapse",
    name: "Registro",
    key: "Registro",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Register",
    component: <Register />,
  },

  {
    type: "collapse",
    name: "home",
    key: "home",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/HomePage",
    component: <HomePage />,
  },
    {
    type: "collapse",
    name: "log",
    key: "log",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Login",
    component: <Login />,
  },
  {
    type: "collapse",
    name: "Consumption",
    key: "consumption",
    icon: <Icon fontSize="small">Consumo</Icon>,
    route: "/consumption",
    component: <ConsumptionPage />,
  },
  {
    type: "collapse",
    name: "Monthly Consumption",
    key: "monthly-consumption",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/consumption/monthly/:id",
    component: <MonthlyConsumptionPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Agregar grupo",
    key: "add-group",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/addGroup",
    component: <AddGroupSAPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Edit Consumption",
    key: "edit-consumption",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/consumption/edit/:id",
    component: <UpdateConsumptionPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Sectores",
    key: "Sectors",
    icon: <Icon fontSize="small">Sector</Icon>,
    route: "/sectores",
    component: <SectorsIndexPage />,
  },
  {
    type: "collapse",
    name: "Unidades de reducción",
    key: "Units",
    icon: <Icon fontSize="small">Units</Icon>,
    route: "/unidades",
    component: <UnitsIndexPage />,
  },
  {
    type: "collapse",
    name: "Fuentes de Emisión",
    key: "sources",
    icon: <Icon fontSize="small">Sources</Icon>,
    route: "/sources",
    component: <SourcesIndexPage />,
  },
  {
    type: "collapse",
    name: "Monthly History",
    key: "monthly-history",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/consumption/monthly/history/:id",
    component: <MonthlyHistoryPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Emissions Reports",
    key: "emissions-reports",
    icon: <Icon fontSize="small">insert_chart</Icon>,
    route: "/reportsEmissions",
    component: <ReportsEmissionsPage />,

  },
  {
    type: "collapse",
    name: "Add Consumption",
    key: "add-consumption",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/consumption/add",
    component: <AddConsumptionPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Edit Monthly Consumption",
    key: "edit-monthly-consumption",
    icon: <Icon fontSize="small">edit_calendar</Icon>,
    route: "/consumption/monthly/edit/:consumptionId/:monthlyId",
    component: <UpdateMonthlyConsumPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Add Monthly Consumption",
    key: "add-monthly-consumption",
    icon: <Icon fontSize="small">add_circle</Icon>,
    route: "/consumption/monthly/add/:consumptionId",
    component: <AddMonthlyConsumPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Confirm Emission Incident",
    key: "confirm-incident",
    icon: <Icon fontSize="small">check_circle</Icon>,
    route: "/emissions/confirm",
    component: <ConfirmIncidentPage />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Incidents History",
    key: "incidents-history",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/emissions/incidents",
    component: <IncidentsHistoryPage />,
    hideInSidebar: true,
  },
{
    type: "collapse",
    name: "Perfil del Usuario",
    key: "user-profile",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/userProfile",
    component: <UserProfilePage />
  },
{
    type: "collapse",
    name: "Perfil del grupo",
    key: "grup-profile",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/groupProfile",
    component: <GrupoProfilePage />
  },
];

export default routes;