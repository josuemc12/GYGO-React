import React, { useState, useEffect } from "react";
import { GetReportsGroupsByService } from "../../API/Reports";
import { GetServices } from "../../API/Reports";
import { ReportCompaniesPDF } from "../../utils/ReportCompaniesPDF";
import { DataGrid } from "@mui/x-data-grid";

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
import { Bar } from "react-chartjs-2";
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

export function ReportServices() {
  const [gruposResumen, setGruposResumen] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [ServicesData, setServicesData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [serviceFilter, setServiceFilter] = useState("todos");

  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchReportServices = async () => {
    try {
      const data = await GetReportsGroupsByService();
      setGruposResumen(data);
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
    fetchReportServices();
    fetchServices();
  }, [statusFilter, serviceFilter]);

  // Datos para gráfico de resumen
  const dataResumen = {
    labels: gruposResumen.map((r) => r.serviceName),
    datasets: [
      {
        label: "Total Grupos",
        data: gruposResumen.map((r) => r.totalGrupos),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

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
                      Servicios
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
                    <Bar data={dataResumen} />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>

        <Footer />
      </MDBox>

      {/* Termina Modal para ver los detalles de la empresa */}
    </DashboardLayout>
  );
}
