/// Manejo de los roles
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
///Iconos
import Icon from "@mui/material/Icon";
import { EnergySavingsLeaf } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";


//Ruta del login
import Login from "./Pages/Public/Login";
//Ruta del inicio de sesion
import { Register } from "./Pages/Public/Register";
import { ReportCompanies } from "./Pages/Private/ReportCompaniesPage";
import { ReportServices } from "./Pages/Private/ReportServices";

import AdminUserDashboard from "./Pages/AdminUserDashboard";
import AdminEmisionFactor from "./Pages/Admin/AdminEmisionFactor";

import ProjectPage from "./Pages/Private/ProjectsPage";
import { HomePage } from "./Pages/Public/HomePage";
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
import { Messages } from "./Pages/Messages";
import { DashboardConsumo } from "./Pages/ConsumoPage";
import ManagmentUsers from "./Pages/ManagmentUsers";
import ServicesPage from "./Pages/ServicesPage";
import Certificaciones from "./Pages/Public/Certifications";
import SubscriptionSwitch from "./Pages/SubscriptionsPages/Subscription";
import { Verify2FA } from "./Pages/Verify2Fa";
import { ServicesHomePage } from "./Pages/Public/ServicesPage";
import { AboutUs } from "./Pages/Public/AboutUs";
import { ContactUs } from "./Pages/Public/ContactUs";
import { ChangePassword } from "./Pages/Public/ChangePassword";
import NotFound from "./Pages/NotFound";

const ProtectedElement = ({ children, roles }) => {
  const { role } = useAuth();

  // No está logueado
  if (!role) return <Navigate to="/login" replace />;

  // No tiene rol permitido
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export const routes = [
  {
    key: "root",
    route: "/",
    component: <HomePage />,
    hideInSidebar: true,
  },

  {
    key: "HomePage",
    route: "/HomePage",
    component: <HomePage />,
  },
  {
    key: "certifications",
    route: "/certificaciones",
    component: <Certificaciones />,
  },
  {
    key: "services",
    route: "/servicios",
    component: <ServicesHomePage />,
  },
  {
    key: "nosotros",
    route: "/nosotros",
    component: <AboutUs />,
  },
  {
    key: "contactos",
    route: "/contactos",
    component: <ContactUs />,
  },

  {
    type: "collapse",
    name: "Manejo de usuarios",
    key: "ManagmentUsers",
    icon: <ManageAccountsIcon fontSize="small" />,
    route: "/ManagmentUsers",

    component: (
      <ProtectedElement roles={["DEV", "SA"]}>
        <ManagmentUsers />
      </ProtectedElement>
    ),
    roles: ["DEV", "SA"],
    
  },

  //Ruta de dashboard no visible
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <ProtectedElement roles={["DEV", "GA", "GU", "DEF", "SA"]}>
        <DashboardGroupPage />
      </ProtectedElement>
    ),
    roles: ["DEV", "GA", "GU", "DEF", "SA"],
    hideInSidebar: true,
  },

  //Ruta de login no visible
  {
    type: "collapse",
    name: "log",
    key: "log",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/login",
    component: <Login />,
    hideInSidebar: true,
  },
  //Ruta de registro no visible
  {
    type: "collapse",
    name: "Registro",
    key: "Registro",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/registro/:inviteToken",
    component: <Register />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Registro sin token",
    key: "RegistroSinToken",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/registro",
    component: <Register />,
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Mensajes",
    key: "Mensajes",
    icon: <Icon fontSize="small">email</Icon>,
    route: "/Messages",
    component: (
      <ProtectedElement roles={["GA", "GU", "DEV", "SA"]}>
        <Messages />
      </ProtectedElement>
    ),
    roles: ["GA", "GU", "DEV", "SA"],
    hideInSidebar: true,
   
  },

  //Ruta de consumo
  {
    type: "collapse",
    name: "Consumo",
    key: "consumption",
    icon: <EnergySavingsLeaf fontSize="small"></EnergySavingsLeaf>,
    route: "/consumption",
    component: (
      <ProtectedElement roles={["DEV", "GA", "GU"]}>
        <ConsumptionPage />
      </ProtectedElement>
    ),
    roles: ["DEV", "GA", "GU"],
  },
  {
    type: "collapse",
    name: "Consumo mensual",
    key: "monthly-consumption",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/consumption/monthly/:id",

    component: (
      <ProtectedElement roles={["DEV", "GA", "GU"]}>
        <MonthlyConsumptionPage />
      </ProtectedElement>
    ),
    hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
  
  },

  {
    type: "collapse",
    name: "Editar consumo mensual",
    key: "edit-monthly-consumption",
    icon: <Icon fontSize="small">edit_calendar</Icon>,
    route: "/consumption/monthly/edit/:consumptionId/:monthlyId",

    component: (
      <ProtectedElement roles={["DEV", "GA", "GU"]}>
        <UpdateMonthlyConsumPage />
      </ProtectedElement>
    ),
    hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
    
  },

  //Ruta para agregar grupo
  {
    type: "collapse",
    name: "Agregar grupo",
    key: "add-group",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/addGroup",

    component: (
      <ProtectedElement roles={["DEV", "SA", "GA"]}>
        <AddGroupSAPage />
      </ProtectedElement>
    ),
    roles: ["DEV", "SA", "GA"],
    hideInSidebar: true,
  },

  //Ruta de Monthly History
  {
    type: "collapse",
    name: "Historial mensual",
    key: "monthly-history",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/consumption/monthly/history/:id",

    component: (
      <ProtectedElement roles={["GA", "DEV", "GU"]}>
        <MonthlyHistoryPage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV", "GU"], 
    hideInSidebar: true,
   
  },

  {
    type: "collapse",
    name: "Confirm Emission Incident",
    key: "confirm-incident",
    icon: <Icon fontSize="small">check_circle</Icon>,
    route: "/emissions/confirm",

    component: (
      <ProtectedElement roles={["GA", "GU", "DEV"]}>
        <ConfirmIncidentPage />
      </ProtectedElement>
    ),
    roles: ["GA", "GU", "DEV"],
    hideInSidebar: true,
  },

  //Perfiles
  {
    type: "collapse",
    name: "Perfil del Usuario",
    key: "user-profile",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/userProfile",

    component: (
      <ProtectedElement roles={["GA", "DEV", "GU", "SA", "DEF"]}>
        <UserProfilePage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV", "GU", "SA", "DEF"],
    hideInSidebar: true,
  },
  {
    type: "collapse",
    name: "Perfil del grupo",
    key: "grup-profile",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/groupProfile",

    component: (
      <ProtectedElement roles={["GA", "DEV", "SA", "GU"]}>
        <GrupoProfilePage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV", "SA", "GU"],
    hideInSidebar: true,
  },
  //Ruta de cambio de contra
  {
    type: "collapse",
    name: "ChangePassword",
    key: "ChangePassword",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/ChangePasswordPage",
    component: (
      <ProtectedElement roles={["GA", "DEV", "GU", "SA", "DEF"]}>
        <ChangePasswordPage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV", "GU", "SA", "DEF"],
    hideInSidebar: true,
  },

  //Ruta de cambio de contra publico
  {
    type: "collapse",
    name: "ChangePasswordPublic",
    key: "ChangePasswordPublic",
    route: "/ChangePassword",
    component: <ChangePassword />,
    hideInSidebar: true,
  },

  //Gestiones para el Super Administrador
  {
    type: "collapse",
    name: "Gestiones",
    key: "gestiones",
    icon: <Icon fontSize="small">assignment</Icon>,

    collapse: [
      {
        //Ruta para sectores
        name: "Sectores",
        key: "sectores",
        icon: <Icon fontSize="small">place</Icon>,
        route: "/sectores",

        component: (
          <ProtectedElement roles={["DEV", "SA"]}>
            <SectorsIndexPage />
          </ProtectedElement>
        ),
        roles: ["DEV", "SA"],
      },

      {
        //Ruta para unidades de reduccion
        name: "Unidades de reducción",
        key: "unidades",
        icon: <Icon fontSize="small">straighten</Icon>,
        route: "/unidades",

        component: (
          <ProtectedElement roles={["DEV", "SA"]}>
            <UnitsIndexPage />
          </ProtectedElement>
        ),
        roles: ["DEV", "SA"],
      },
      //Ruta para fuentes de emisiones
      {
        name: "Fuentes de Emisión",
        key: "sources",
        icon: <Icon fontSize="small">eco</Icon>,
        route: "/sources",

        component: (
          <ProtectedElement roles={["DEV", "SA"]}>
            <SourcesIndexPage />
          </ProtectedElement>
        ),
        roles: ["DEV", "SA"],

      },
      ///gESTIONES DEL ADMIN DE GRUPO

      {
        name: "Servicios",
        key: "Services",
        icon: <Icon fontSize="small">business</Icon>,
        route: "/Services",
        component: (
          <ProtectedElement roles={["SA", "DEV"]}>
            <ServicesPage />
          </ProtectedElement>
        ),
        roles: ["SA", "DEV"],
      },

      {
        name: "Factor Emision",
        key: "AdminEmisionFactor",
        icon: <Icon fontSize="small">eco</Icon>,
        route: "/AdminEmisionFactor",

        component: (
          <ProtectedElement roles={["DEV", "SA"]}>
            <AdminEmisionFactor />
          </ProtectedElement>
        ),
        roles: ["DEV", "SA"],
      },

      //Ruta Tabla de usuarios
      {
        name: "Usuarios",
        key: "AdminUserDashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/AdminUserDashboard",
        component: (
          <ProtectedElement roles={["GA", "DEV"]}>
            <AdminUserDashboard />
          </ProtectedElement>
        ),
        roles: ["GA", "DEV"], 
      },
    ],
    roles: ["DEV", "SA", "GA"],
  },

  //subscripciones
  {
    type: "collapse",
    name: "Suscripción",
    key: "subscription",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/subscription",
    component: <SubscriptionSwitch />,
    roles: ["DEV", "DEF", "GA"],
  },

  {
    type: "collapse",
    name: "Agregar consumo",
    key: "add-consumption",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/consumption/add",
    component: (
      <ProtectedElement roles={["DEV", "GA", "GU"]}>
        <AddConsumptionPage />
      </ProtectedElement>
    ),
     hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
   
 
  },
  {
    type: "collapse",
    name: "Actualizar consumo",
    key: "add-consumption",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/consumption/edit/:id",
    component: (
      <ProtectedElement roles={["DEV", "GA", "GU"]}>
        <UpdateConsumptionPage />
      </ProtectedElement>
    ),
    hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
    

  },
  {
    type: "collapse",
    name: "Editar consumo mensual",
    key: "edit-monthly-consumption",
    icon: <Icon fontSize="small">edit_calendar</Icon>,
    route: "/consumption/monthly/edit/:consumptionId/:monthlyId",
    component: (
      <ProtectedElement roles={["DEV", "GA", "GU"]}>
        <UpdateMonthlyConsumPage />
      </ProtectedElement>
    ),
    hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
    

  },
  {
    type: "collapse",
    name: "Agregar consumo mensual",
    key: "add-monthly-consumption",
    icon: <Icon fontSize="small">add_circle</Icon>,
    route: "/consumption/monthly/add/:consumptionId",
    component: (
      <ProtectedElement roles={["DEV", "GA", "GU"]}>
        <AddMonthlyConsumPage />
      </ProtectedElement>
    ),
     hideInSidebar: true,
    roles: ["DEV", "GA", "GU"],
  },

  {
    type: "collapse",
    name: "Segundo Factor",
    key: "Segundo-Factor",
    icon: <Icon fontSize="small">add_circle</Icon>,
    route: "/verify-2fa",
    component: <Verify2FA />,
    hideInSidebar: true,
  },

  //Ruta de incidents history
  {
    type: "collapse",
    name: "Historial de incidentes",
    key: "emissions/incidents",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/emissions/incidents",

    component: (
      <ProtectedElement roles={["GA", "DEV"]}>
        <IncidentsHistoryPage />
      </ProtectedElement>
    ),
    roles: ["GA", "DEV"],
  },

  //Ruta del home

  {
    type: "collapse",
    name: "Consumo mensual",
    key: "monthly-consumption",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/consumption/monthly/:id",
    component: <MonthlyConsumptionPage />,
    hideInSidebar: true,
  },

  //Ruta de proyectos
  {
    type: "collapse",
    name: "Proyectos",
    key: "ProjectPage",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/ProjectPage",

    component: (
      <ProtectedElement roles={["GA", "GU", "DEV"]}>
        <ProjectPage />
      </ProtectedElement>
    ),
    roles: ["GA", "GU", "DEV"],
  },

  //Ruta de reportes
  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">bar_chart</Icon>,

    collapse: [
      {
        name: "Emisiones",
        key: "reportsEmissions",
        icon: <Icon fontSize="small">insert_chart</Icon>,
        route: "/reportsEmissions",

        component: (
          <ProtectedElement roles={["GA", "DEV"]}>
            <ReportsEmissionsPage />
          </ProtectedElement>
        ),
        roles: ["GA", "DEV"],
      },
      {
        name: "Empresas",
        key: "ReportCompanies",
        icon: <Icon fontSize="small">insert_chart</Icon>,
        route: "/ReportCompanies",

        component: (
          <ProtectedElement roles={["SA", "DEV"]}>
            <ReportCompanies />
          </ProtectedElement>
        ),
        roles: ["SA", "DEV"],
      },

      {
        name: "Servicios",
        key: "ReportServices",
        icon: <Icon fontSize="small">insert_chart</Icon>,
        route: "/ReportServices",

        component: (
          <ProtectedElement roles={["SA", "DEV"]}>
            <ReportServices />
          </ProtectedElement>
        ),
        roles: ["SA", "DEV"],
      },
    ],
    roles: ["DEV", "GA"],
  },

  // Ruta 404
  {
    key: "not-found",
    route: "*",
    component: <NotFound />,
    hideInSidebar: true,
  },
];

export const getRoutes = (role) => {
  const filterByRole = (routesList) => {
    return routesList
      .map((route) => {
        // Si la ruta requiere roles y el usuario no tiene rol, bloquear
        if (route.roles && !role) return null;
        
        // Verificamos si este ítem tiene permiso
        const hasAccess = !route.roles || (role && route.roles.includes(role));

        // Si tiene colapsables (dropdown), los procesamos también
        if (route.collapse) {
          const filteredCollapse = filterByRole(route.collapse);
          if (filteredCollapse.length === 0 && !hasAccess) return null;

          return {
            ...route,
            collapse: filteredCollapse,
          };
        }

        return hasAccess ? route : null;
      })
      .filter(Boolean); // Remueve los nulls
  };

  return filterByRole(routes);
};
