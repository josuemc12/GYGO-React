import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Stack,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AddOutlined, EditOutlined } from "@mui/icons-material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import { getSectors, PostSector, UpdateSector } from "../API/Sector";
import CloseIcon from "@mui/icons-material/Close";

export default function SectorsIndexPage() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sectorName, setSectorName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    setLoading(true);
    try {
      const data = await getSectors();
      setSectors(data);
    } catch (e) {
      console.error("Error cargando sectores", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSectorClick = () => {
    setModalOpen(true);
    setEditMode(false);
    setSectorName("");
    setErrors({});
  };

  const handleEditClick = (sector) => {
    setEditMode(true);
    setModalOpen(true);
    setSectorName(sector.nombre);
    setEditingId(sector.sectorId);
    setErrors({});
  };

  const handleSaveSector = async () => {
    if (!sectorName.trim()) {
      setErrors({ name: "El nombre es requerido" });
      return;
    }
    try {
      if (editMode) {
        await UpdateSector({ sectorId: editingId, nombre: sectorName });
        setModalOpen(false);
        await Swal.fire({
          icon: "success",
          title: "Sector actualizado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await PostSector({ nombre: sectorName });
        setModalOpen(false);
        await Swal.fire({
          icon: "success",
          title: "Sector creado exitosamente",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      setModalOpen(false);
      await loadSectors();
    } catch (e) {
      console.error("Error al guardar sector", e);
      Swal.fire("Error", "No se pudo guardar el sector", "error");
    }
  };

  const columns = [
    { Header: "Nombre del Sector", accessor: "name", align: "left" },
    { Header: "Acciones", accessor: "actions", align: "center" },
  ];

  const rows = sectors.map((sector) => ({
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {sector.nombre}
      </MDTypography>
    ),
    actions: (
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tooltip title="Editar sector">
          <IconButton
            size="small"
            sx={{ color: "#1976D2" }}
            onClick={() => handleEditClick(sector)}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {/* Header */}
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                background: "#ffffff",
                mb: 3,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                padding: 3,
              }}
            >
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <MDBox display="flex" flexDirection="column" gap={1}>
                      <MDBox display="flex" flexDirection="column">
                        <MDBox display="flex" alignItems="center" gap={1}>
                          <MDTypography variant="h6">Sectores</MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1}>
                          <MDTypography variant="body2" color="text">
                            Gestiona los sectores registrados dentro de la
                            organización
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Grid>
                  <Grid>
                    <MDButton
                      variant="outlined"
                      onClick={handleAddSectorClick}
                      startIcon={<AddOutlined />}
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
                      Agregar Sector
                    </MDButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Tabla */}
          <Grid size={{ xs: 12 }}>
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
                  Registro de Sectores
                </MDTypography>
              </MDBox>
              <MDBox
                pt={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  width: "100%",
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
                  loading={loading}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </MDBox>

      {/* Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <Box sx={{}}>
          <DialogTitle>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h5" gutterBottom>
                {editMode ? "Editar Sector" : "Agregar Nuevo Sector"}
              </MDTypography>
              <IconButton onClick={() => setModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </MDBox>
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              fullWidth
              label="Nombre del Sector"
              value={sectorName}
              onChange={(e) => {
                setSectorName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleSaveSector}
              fullWidth
            >
              Guardar
            </MDButton>
          </DialogActions>
        </Box>
      </Dialog>
    </DashboardLayout>
  );
}
