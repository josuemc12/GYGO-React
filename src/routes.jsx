// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";

//Ruta del login
import Login from "./Pages/Login";




import  ProjectPage  from "./Pages/ProjectsPage";;
import {HomePage} from "./Pages/HomePage";
import { ChangePasswordPage } from "./Pages/ChangePasswordPage";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "ProjectsPage",
    key: "Projects",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/ProjectPage",
    component: <ProjectPage />,
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