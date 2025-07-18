import React, { useState, useEffect } from "react";
import { getReportCompanies } from "../../API/Reports";
import { GetServices } from "../../API/Reports";
import { ReportCompaniesPDF } from "../../utils/ReportCompaniesPDF";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import {
  Divider,
  Grid,
  FormControl,
  Select,
  CircularProgress,
  Switch,
  TextField,
  Button,
  IconButton,
  Typography,
  Modal,
  Box,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
  Card,
  InputLabel,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export function ReportCompanies() {
  const [ReportCompaniesData, SetReportCompaniesData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [ServicesData, setServicesData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [serviceFilter, setServiceFilter] = useState("todos");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchReportCompanies = async () => {
    try {
      const statusParam =
        statusFilter === "todos" ? null : statusFilter === "true";
      const idServiceParam =
        serviceFilter !== "todos" ? parseInt(serviceFilter) : null;
      const data = await getReportCompanies({
        status: statusParam,
        idService: idServiceParam,
      });

      SetReportCompaniesData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await GetServices();
      setServicesData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReportCompanies();
    fetchServices();
  }, [statusFilter, serviceFilter]);

  const CreatePDF = async () => {
    try {
      console.log(ReportCompaniesData);

      ReportCompaniesPDF(ReportCompaniesData);
    } catch (error) {
      console.log("Error a crear el pdf");
    } finally {
    }
  };
  //Acciones para el modal
  const handleOpenModal = (group) => {
    console.log(group);
    setSelectedCompany(group);
    console.log(selectedCompany);
    setOpenModal(true);
  };
  const handleCloseModal = async () => {
    setOpenModal(false);
    setSelectedCompany(null);
  };
  //Fin de acciones del modal

  const columns = [
    { Header: "Nombre de la Empresa", accessor: "nombre", align: "left" },
    {
      Header: "Fecha de incorporación",
      accessor: "fechaCreación",
      align: "left",
    },
    { Header: "Servicio", accessor: "serviceName", align: "center" },
    { Header: "Cantidad Usuarios", accessor: "numberOfUsers", align: "center" },
    { Header: "Estado", accessor: "estatus", align: "center" },

    { Header: "Acciones", accessor: "action", align: "center" },
  ];

  const rows = ReportCompaniesData.map((companies) => ({
    nombre: (
      <MDTypography variant="caption" fontWeight="medium">
        {companies.nombre}
      </MDTypography>
    ),
    fechaCreación: (
      <MDTypography variant="caption" color="text">
        {dayjs(companies.fechaCreación).format("DD/MM/YYYY")}
      </MDTypography>
    ),

    serviceName: (
      <MDTypography variant="caption" color="text">
        {companies.serviceName}
      </MDTypography>
    ),
    numberOfUsers: (
      <MDTypography variant="caption" color="text">
        {companies.numberOfUsers}
      </MDTypography>
    ),
    estatus: (
      <MDTypography variant="caption" color="text">
        {companies.estatus ? "Activo" : "Inactivo"}
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
          <IconButton size="small"  sx={{ color: "#6c757d" }} onClick={() => handleOpenModal(companies)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <MDBox mb={2}>
          <MDBox
            borderRadius="xl"
            border="1px solid #ccc"
            p={3}
            mb={2}
            bgColor="white"
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <MDBox display="flex" flexDirection="column">
                  <MDBox display="flex" alignItems="center" gap={1}>
                    <FilterAltOutlinedIcon fontSize="medium" />
                    <MDTypography variant="h6">Filtros y Acciones</MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid item>
                <MDButton
                  variant="outlined"
                  
                  onClick={CreatePDF}
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
                  Descargar Reporte
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
                    <Grid container spacing={2}>
                      <Grid item>
                        <FormControl size="medium" sx={{ width: 180 }}>
                          <InputLabel id="Estado-label">Estado</InputLabel>
                          <Select
                            labelId="Estado-label"
                            name="estado"
                            label="Estado"
                            fullWidth
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            sx={{ height: 40 }}
                          >
                            <MenuItem value="todos">Todos</MenuItem>
                            <MenuItem value="true">Activos</MenuItem>
                            <MenuItem value="false">Inactivos</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Filtrar por servicios */}
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <FormControl size="medium" sx={{ width: 180 }}>
                          <InputLabel id="Servicios-label">
                            Servicios
                          </InputLabel>

                          <Select
                            labelId="Servicios-label"
                            name="Servicios"
                            label="Servicios"
                            fullWidth
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                            sx={{ height: 40 }}
                          >
                            <MenuItem value="todos">Todos</MenuItem>
                            {ServicesData.map((service) => (
                              <MenuItem
                                key={service.serviceId}
                                value={service.serviceId}
                              >
                                {service.serviceName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
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
                      Compañias
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    pt={3}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      minHeight: "100px",
                      width: "1200px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
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

        <Footer />
      </MDBox>

      {/* Modal para ver los detalles de la empresa */}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {/* Encabezado */}
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Detalles de la Empresa
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>

          <Divider sx={{ mb: 2 }} />

          {/* Cuerpo con datos */}
          <Grid container spacing={2}>
            {[
              ["Nombre", selectedCompany?.nombre || "-"],
              ["Correo", selectedCompany?.correo || "-"],
              ["Fecha de incorporación", selectedCompany?.fechaCreación || "-"],
              ["Servicio asociado", selectedCompany?.serviceName || "-"],
              ["Cantidad de usuarios", selectedCompany?.numberOfUsers || "-"],
              ["Estado", selectedCompany?.estatus ? "Activo" : "Inactivo"],
            ].map(([label, value], index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="subtitle1" fontWeight="medium">
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Botón de cerrar */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button variant="contained" color="info" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Termina Modal para ver los detalles de la empresa */}
    </DashboardLayout>
  );
}
