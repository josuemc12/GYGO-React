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
} from "@mui/material";
import { AddOutlined, EditOutlined } from "@mui/icons-material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import { getUnits, CreateUnits, UpdateUnits } from "../API/unit";



export function UnitsIndexPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [unitData, setUnitData] = useState({ nombre: "", diminutivo: "" });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    setLoading(true);
    try {
      const data = await getUnits();
      setUnits(data);
    } catch (e) {
      console.error("Error cargando unidades", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setModalOpen(true);
    setEditMode(false);
    setUnitData({ nombre: "", diminutivo: "" });
    setErrors({});
  };

  const handleEditClick = (unit) => {
    setEditMode(true);
    setEditId(unit.unidadId);
    setUnitData({ nombre: unit.nombre, diminutivo: unit.diminutivo });
    setModalOpen(true);
    setErrors({});
  };

  const handleSave = async () => {
    if (!unitData.nombre.trim() || !unitData.diminutivo.trim()) {
      setErrors({ nombre: "Requerido", diminutivo: "Requerido" });
      return;
    }
    try {
      if (editMode) {
        await UpdateUnits({ unidadId: editId, ...unitData });
        setModalOpen(false);
        await Swal.fire({
                  icon: "success",
                  title: "Unidad actualizada correctamente",
                  showConfirmButton: false,
                  timer: 2000,
                });
      } else {
        await CreateUnits(unitData);
        setModalOpen(false);
        await Swal.fire({
                  icon: "success",
                  title: "Unidad creada correctamente",
                  showConfirmButton: false,
                  timer: 2000,
                });
      }
      await loadUnits();
    } catch (e) {
      console.error("Error guardando unidad", e);
      Swal.fire("Error", "No se pudo guardar la unidad", "error");
    }
  };

  const columns = [
    { Header: "Nombre", accessor: "nombre", align: "left" },
    { Header: "Diminutivo", accessor: "diminutivo", align: "left" },
    { Header: "Acciones", accessor: "actions", align: "center" },
  ];

  const rows = units.map((unit) => ({
    nombre: (
      <MDTypography variant="caption" fontWeight="medium">
        {unit.nombre}
      </MDTypography>
    ),
    diminutivo: (
      <MDTypography variant="caption" color="text">
        {unit.diminutivo}
      </MDTypography>
    ),
    actions: (
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tooltip title="Editar Unidad">
          <IconButton
            size="small"
            color="success"
            onClick={() => handleEditClick(unit)}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{xs:12}}>
            <Card
              sx={{
                background: "#ffffff",
                mb: 3,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid>
                    <MDBox display="flex" flexDirection="column" gap={1}>
                      <MDTypography variant="h6">Unidades</MDTypography>
                      <MDTypography variant="body2" color="text">
                        Gestiona las unidades registradas en el sistema
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid>
                    <MDButton
                      onClick={handleAddClick}
                      startIcon={<AddOutlined />}
                    >
                      Agregar Unidad
                    </MDButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12}}>
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
                <MDTypography variant="h6" color="white">
                  Registro de Unidades
                </MDTypography>
              </MDBox>
              <MDBox>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <MDTypography variant="h6" gutterBottom>
            {editMode ? "Editar Unidad" : "Agregar Unidad"}
          </MDTypography>
          <TextField
            fullWidth
            label="Nombre"
            value={unitData.nombre}
            onChange={(e) => setUnitData({ ...unitData, nombre: e.target.value })}
            error={!!errors.nombre}
            helperText={errors.nombre}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Diminutivo"
            value={unitData.diminutivo}
            onChange={(e) => setUnitData({ ...unitData, diminutivo: e.target.value })}
            error={!!errors.diminutivo}
            helperText={errors.diminutivo}
            sx={{ mb: 2 }}
          />
          <MDButton
            variant="gradient"
            color="success"
            onClick={handleSave}
            fullWidth
          >
            Guardar
          </MDButton>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}
