import React, { useState, useEffect } from "react";


import {
  getUsers,
  getUsersbyRol
} from "../API/ManagmentUsers";



import {
  Grid,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Modal,
  Switch,
  TextField,
  InputLabel,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


import { Try } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Swal from "sweetalert2";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function ManagmentUsers() {
  //Hook para manejar el JSON de proyectos
  const [Users, setUsers] = useState([]);
  //Hook para manejar el JSON de proyectos filtro
  const [filter, setFilter] = useState("todos");
  //Hook para manejar el JSON de proyectos por fechas
  
  const [openModal, setOpenModal] = useState(false);
  const [openModalProjects, setOpenModalProjects] = useState(false);

  //Hook para cuando un loading
  const [loading, setLoading] = useState(false);

  
  //Use State para el modal de agregar o editar proyectos
  const [modoEdicion, setModoEdicion] = useState(false);


  const [projectId, setProjectId] = useState(null);
  const [reductionUnit, setReductionUnit] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);

 
  const fetchUsers = async () => {
    try {
   
       if (filter === "todos") {
        const data = await getUsers();
        setUsers(data);
        console.log(setUsers);
      } else {

        const  data = await getUsersbyRol(rol);
        setUsers(data);
      }
     
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { 
      fetchUsers();
  }, [filter]);




  const columns = [
    { Header: "Nombre", accessor: "nombre", align: "left" },
    { Header: "Correo", accessor: "correo", align: "left" },
    {
      Header: "Grupo",
      accessor: "nombregrupo",
      align: "center",
    },
    { Header: "rol", accessor: "rol", align: "center" },

    { Header: "Acciones", accessor: "action", align: "center" },
  ];

  const rows = Users.map((user) => ({
    nombre: (
      <MDTypography variant="caption" fontWeight="medium">
        {user.nombre}
      </MDTypography>
    ),
    correo: (
      <MDTypography variant="caption" color="text">
        {user.correo}
      </MDTypography>
    ),
    nombregrupo: (
      <MDTypography variant="caption" color="text">
        {user.nombregrupo}
      </MDTypography>
    ),
    rol: (
      <MDTypography variant="caption" color="text">
        {user.rol}
      </MDTypography>
    ),

    action: (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Tooltip title="Ver detalles">
          <IconButton size="small" >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            size="small"
            color="info"
           
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            color="error"
            
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
       
          <MDBox mb={2}>
            <MDBox
              borderRadius="xl"
              border="1px solid #ccc"
              p={3}
              mb={2}
              bgColor="white"
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <MDBox display="flex" flexDirection="column">
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <FilterAltOutlinedIcon fontSize="medium" />
                      <MDTypography variant="h6">
                        Filtros y Acciones
                      </MDTypography>
                    </MDBox>
                    <MDTypography variant="body2" color="text">
                      Filtra los proyectos por estado y fechas
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item>
                  <MDButton
                  variant="outlined"
                  sx={{
                    borderColor: "#4CAF50",
                    color: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#E8F5E9",
                      borderColor: "#43A047",
                      color: "#388E3C",
                    },
                  }} 
                  >
                    Nuevo Usuario
                  </MDButton>
                </Grid>
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                mt={2}
              >
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <FormControl size="medium" sx={{ width: 180 }}>
                         <InputLabel id="Estado-label">Estado</InputLabel>
                        <Select
                         labelId="Estado-label"
                            name="estado"
                            label="Estado"
                            fullWidth
                        
                          
                          sx={{ height: 40 }}
                        >
                          <MenuItem value="todos">Todos</MenuItem>
                          <MenuItem value="true">Realizados</MenuItem>
                          <MenuItem value="false">Pendientes</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

         
                  </Grid>
                </Grid>


              </Grid>
            </MDBox>

            <MDBox pt={6} pb={3}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Card>
                    <MDBox
                      mx={2}
                      mt={-3}
                      py={3}
                      px={2}
                      variant="gradient"
                      bgColor="success"
                      borderRadius="lg"
                      coloredShadow="success"
                    >
                      <MDTypography variant="h6" color="white" align="left">
                        Proyectos
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={3}
                     sx={{
                          p: 4,
                          textAlign: "center",
                          minHeight: "100px",
                          width: "1200px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                      <DataTable
                      
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={true}
                        noEndBorder
                      />
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        
      
      </MDBox>

  
        <Footer />
    </DashboardLayout>
  );
}
export default ManagmentUsers;
