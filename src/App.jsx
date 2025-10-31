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
import NotFound from "./Pages/NotFound";

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
  const { role } = useAuth();

  const publicRoutes = [
    "/",
    "/login",
    "/homepage",
    "/certificaciones",
    "/servicios",
    "/nosotros",
    "/contactos",
    "/registro",
    "/registro/:inviteToken",
    "/sendinvite",
    "/verify-2fa",
    "/changepassword",
    "/addgroup",
  ];

  const matchRoute = (route, path) => {
    const pattern = "^" + route.replace(/:\w+/g, "[^/]+") + "$";
    return new RegExp(pattern, "i").test(path);
  };

  const filteredRoutes = getRoutes(role);

  const getAllRoutes = (routesList) => {
    const paths = [];
    routesList.forEach((route) => {
      if (route.route) paths.push(route.route.toLowerCase());
      if (route.collapse) paths.push(...getAllRoutes(route.collapse));
    });
    return paths;
  };

  const allValidRoutes = getAllRoutes(filteredRoutes);

  const isPublicRoute = publicRoutes.some((route) => {
    if (route.includes(":")) return matchRoute(route, pathname.toLowerCase());
    return route.toLowerCase() === pathname.toLowerCase();
  });

  const isValidRoute = allValidRoutes.some((route) => {
    if (route.includes(":")) return matchRoute(route, pathname.toLowerCase());
    return pathname.toLowerCase() === route;
  });

  const hideSidebar = isPublicRoute || !isValidRoute;

  useMemo(() => {
    const cacheRtl = createCache({ key: "rtl", stylisPlugins: [rtlPlugin] });
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

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
      <Routes>
        {renderRoutes(filteredRoutes)}
        <Route
          path="*"
          element={isPublicRoute ? <Navigate to="/" replace /> : <NotFound />}
        />
      </Routes>
    </ThemeProvider>
  );
}
