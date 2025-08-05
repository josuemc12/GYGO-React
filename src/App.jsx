/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import "regenerator-runtime/runtime";
import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

//Manejo de roles
import { useAuth } from "./context/AuthContext";

// Rutas
import { routes, getRoutes } from "./routes";

// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "./context/index";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const hideSidebarRoutes = [
    "/login",
    
    "/sendinvite",
    "/verify-2fa",
    "/",
    "/homepage",
    "/certificaciones",
    "/registro",
    "/registro/:inviteToken",
    "/servicios",
    "/nosotros",
    "/contactos",
    "/ChangePassword",
    "/addGroup",
  ];
  const matchRoute = (route, path) => {
    // Convertir rutas con params ":param" a regex
    const pattern = "^" + route.replace(/:\w+/g, "[^/]+") + "$";
    const regex = new RegExp(pattern, "i");
    return regex.test(path);
  };

  const hideSidebar = hideSidebarRoutes.some((route) => {
    if (route.includes(":")) {
      return matchRoute(route, pathname.toLowerCase());
    }
    return route.toLowerCase() === pathname.toLowerCase();
  });

  const specialRoutes = [
    "/Login",
    "registro",
    "/registro/:inviteToken",
    "/sendinvite",
    "/verify-2fa",
    "/ChangePassword",
    "/",
    "/addGroup",
    
  ];
  const isSpecialRoute = specialRoutes.some((route) => {
    if (route.includes(":")) {
      return matchRoute(route, pathname.toLowerCase());
    }
    return pathname.toLowerCase().startsWith(route.toLowerCase());
  });

  const { role } = useAuth();

  const filteredRoutes = getRoutes(role);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const renderRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      if (route.collapse) return renderRoutes(route.collapse);
      if (route.route && route.component)
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      return [];
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && !hideSidebar && (
        <>
          <Sidenav
            color={sidenavColor}
            brandName="GYGO"
            routes={filteredRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {renderRoutes(filteredRoutes)}
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
    </ThemeProvider>
  );
}
