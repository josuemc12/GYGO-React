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

import { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

function DropdownCollapse({ route, collapseName }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Si alguna subruta está activa, abre el dropdown
    const isActiveSubroute = route.collapse.some((sub) => sub.key === collapseName);
    setOpen(isActiveSubroute);
  }, [collapseName, route.collapse]);

  return (
    <>
      <SidenavCollapse
        name={route.name}
        icon={route.icon}
        onClick={() => setOpen(!open)}
        active={
          route.key === collapseName ||
          route.collapse.some((sub) => sub.key === collapseName)
        }
        noCollapse
        sx={{ cursor: "pointer" }}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {route.collapse.map((subRoute) => (
            <NavLink
              key={subRoute.key}
              to={subRoute.route}
              style={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                name={subRoute.name}
                icon={subRoute.icon}
                active={subRoute.key === collapseName}
                sx={{ pl: 4 }}
              />
            </NavLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default DropdownCollapse;
