import React, { useEffect, useState } from "react";
import { TextField, Grid, Box, Card, IconButton } from "@mui/material";
import Footer from "examples/Footer";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
import DataTable from "../examples/Tables/DataTable";
import { GetServices } from "../API/Reports";
import { useAuth } from "../context/AuthContext";
import CancelIcon from "@mui/icons-material/Cancel";
import SuperAdminCancelModal from "../components/SuperAdminCancelModal";
import { cancelAdminSubscription } from "../API/Subscription";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Tooltip from "@mui/material/Tooltip";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { userId, role } = useAuth();

useEffect(() => {
  if (!searchTerm) {
    setTableRows(services);
  } else {
    const filtered = services.filter(
      (item) =>
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTableRows(filtered);
  }
}, [searchTerm, services]);



  
  // Update columns to include actions
  const columns = [
    { Header: "Servicio", accessor: "serviceName" },
    { Header: "Grupo", accessor: "groupName" },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: ({ value }) =>
        role === "SA" && ( // Only show for super admin
          <Tooltip title="Cancelar grupo">
            <IconButton
              color="error"
              onClick={() => {
                setSelectedGroup(value);
                setModalOpen(true);
              }}
              size="small"
            >
              <CancelIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        ),
      align: "center",
    },
  ];

  const handleCancelConfirm = async (groupId, reason) => {
    try {
      await cancelAdminSubscription(groupId, reason);

      const data = await GetServices();
      const flattenedRows = data.flatMap((service) =>
        service.grupos.map((grupo) => ({
          serviceName: service.serviceName,
          serviceId: service.serviceId,
          groupName: grupo.nombre,
          groupId: grupo.grupoId,
          actions: grupo.grupoId,
        }))
      );
      setServices(flattenedRows);
      setTableRows(flattenedRows);

      return true;
    } catch (error) {
      console.error("Error al cancelar:", error);
      throw error;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

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
              spacing={2}
            >
              <Grid item>
                <MDBox display="flex" alignItems="center" gap={1}>
                  <FilterAltOutlinedIcon fontSize="medium" />
                  <MDTypography variant="h6">Filtros y Acciones</MDTypography>
                </MDBox>
              </Grid>

              <Grid item></Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label="Buscar servicios"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: "200px",mb: 3 }}
                />
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
                  <MDBox pt={3}>
                    <MDBox
                      pt={3}
                      sx={{
                        width: "100%",
                        overflowX: "auto",
                        "& table": {
                          width: "100%",
                          tableLayout: "fixed",
                        },
                      }}
                    >
                      <DataTable
                        table={{ columns, rows: tableRows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={true}
                        noEndBorder
                      />
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>

        <Footer />
      </MDBox>

      {/*             
            <MDBox py={3} >
                















                <MDTypography variant="h4" fontWeight="bold" mb={2}>
                    Servicios por grupo
                </MDTypography>
                <TextField
                    label="Buscar servicios o grupos"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card >
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
                                <MDBox pt={3} >
                                    <MDBox pt={3} sx={{
                                        width: "100%",
                                        overflowX: "auto",
                                        "& table": {
                                            width: "100%",
                                            tableLayout: "fixed",
                                        }
                                    }}>
                                        <DataTable
                                            table={{ columns, rows: tableRows }}
                                            isSorted
                                            entriesPerPage
                                            showTotalEntries
                                            noEndBorder
                                        />
                                    </MDBox>
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            <Footer />  
            </MDBox> */}
      <SuperAdminCancelModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleCancelConfirm}
        groupId={selectedGroup}
      />
    </DashboardLayout>
  );
}
