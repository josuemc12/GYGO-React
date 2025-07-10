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
import Login from "./Pages/Login";
//Ruta del inicio de sesion
import { Register } from "./Pages/Register";
import {ReportCompanies} from "./Pages/ReportCompaniesPage"

import AdminUserDashboard from "./Pages/AdminUserDashboard";
import AdminEmisionFactor from "./Pages/Admin/AdminEmisionFactor"



import  ProjectPage  from "./Pages/ProjectsPage";;
import {HomePage} from "./Pages/HomePage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";



const routes = [
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
    name: "Reporte Compañias",
    key: "ReporteCompañias",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/ReportCompanies",
    component: <ReportCompanies />,
  },



  {
    type: "collapse",
    name: "ProjectsPage",
    key: "Projects",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/ChangePasswordPage",
    component: <ChangePasswordPage />,
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
];

export default routes;