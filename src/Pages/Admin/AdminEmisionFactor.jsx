import { useState, useEffect, useMemo } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import EmissionFactorModal from "../../components/EmisionFactorForm";

import {
  getMeasurementUnits,
  getSectors,
  getSources,
  getAllPCGs,
  createEmissionFactor,
  getEmissionFactors,
  updateEmissionFactor,
  deleteEmissionFactor,
} from "../../API/Factor";

import Swal from "sweetalert2";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

import { Grid, Card, TextField } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const EmissionFactorDashboard = () => {
  const [emissionFactors, setEmissionFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFactor, setEditingFactor] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sources, setSources] = useState([]);
  const [pcgs, setPcgs] = useState([]);

  useEffect(() => {
    const fetchEmissionFactors = async () => {
      try {
        setLoading(true);
        const factors = await getEmissionFactors();
        console.log("Fetched emission factors", factors);
        setEmissionFactors(factors);
      } catch (err) {
        console.error("Error loading emission factors:", err);
        setError("Failed to load emission factors.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmissionFactors();
  }, []);

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        setLoading(true);
        const [unitsRaw, sectorsRaw, sourcesRaw, pcgsRaw] = await Promise.all([
          getMeasurementUnits(),
          getSectors(),
          getSources(),
          getAllPCGs(),
        ]);

        const units = unitsRaw.map((u) => ({ id: u.unidadId, name: u.nombre }));
        const sectors = sectorsRaw.map((s) => ({
          id: s.sectorId,
          name: s.nombre,
        }));
        const sources = sourcesRaw.map((s) => ({
          id: s.fuenteId,
          name: s.nombre,
        }));
        const pcgs = pcgsRaw.map((p) => ({ id: p.pcgId, name: p.nombre }));

        setMeasurementUnits(units);
        setSectors(sectors);
        setSources(sources);
        setPcgs(pcgs);
      } catch (err) {
        console.error(err);
        setError("Failed to load reference data");
      } finally {
        setLoading(false);
      }
    };

    fetchReferenceData();
  }, []);

  const getUnitName = (id) =>
    measurementUnits.find((u) => u.id === id)?.name || "Unknown";
  const getSectorName = (id) =>
    sectors.find((s) => s.id === id)?.name || "Unknown";
  const getSourceName = (id) =>
    sources.find((s) => s.id === id)?.name || "Unknown";
  const getPcgName = (id) => pcgs.find((p) => p.id === id)?.name || "Unknown";

  const filteredFactors = useMemo(() => {
    if (!searchTerm) return emissionFactors;

    const search = searchTerm.toLowerCase();

    return emissionFactors.filter((factor) => {
      return (
        (factor.name || "").toLowerCase().includes(search) ||
        (getUnitName(factor.unit) || "").toLowerCase().includes(search) ||
        (getUnitName(factor.unitCarbon) || "").toLowerCase().includes(search) ||
        (getSectorName(factor.sectoId) || "").toLowerCase().includes(search) ||
        (getSourceName(factor.sourceId) || "").toLowerCase().includes(search) ||
        (getPcgName(factor.pcgId) || "").toLowerCase().includes(search)
      );
    });
  }, [emissionFactors, searchTerm]);

  const handleCreate = () => {
    setEditingFactor(null);
    setIsModalOpen(true);
  };

  const handleEdit = (factor) => {
    setEditingFactor(factor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingFactor(null);
  };

  const handleDelete = (factor) => {
    setDeleteConfirmation(factor);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      await deleteEmissionFactor(deleteConfirmation.id);

      setEmissionFactors((prev) =>
        prev.filter((f) => f.id !== deleteConfirmation.id)
      );
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting emission factor:", error);
    }
  };

  const handleModalSubmit = async (data) => {
    try {
      if (editingFactor) {
        const success = await updateEmissionFactor(data);
        if (success) {
          setEmissionFactors((prev) =>
            prev.map((f) => (f.id === editingFactor.id ? { ...f, ...data } : f))
          );
        }
      } else {
        const success = await createEmissionFactor(data);
        if (success) {
          setEmissionFactors((prev) => [...prev, data]);
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving emission factor:", error);
    }
  };

  const columns = [
    { Header: "Nombre", accessor: "nombre", align: "left" },
    { Header: "Unidad Primaria", accessor: "UnidadPrimaria", align: "left" },
    {
      Header: "Unidad de Carbono",
      accessor: "UnidaddeCarbono",
      align: "center",
    },
    { Header: "Valor Unitario", accessor: "ValorUnitario", align: "center" },
    { Header: "Valor del Carbon", accessor: "ValorCarbon", align: "center" },
    { Header: "Factor de emisión", accessor: "Factoremisión", align: "center" },
    { Header: "PCG", accessor: "PCG", align: "center" },
    { Header: "Sector", accessor: "Sector", align: "center" },
    { Header: "Fuente", accessor: "Fuente", align: "center" },
    { Header: "Acciones", accessor: "Acciones", align: "center" },
  ];

  const rows = filteredFactors.map((factor) => ({
    nombre: (
      <MDTypography variant="caption" fontWeight="medium">
        {factor.name}
      </MDTypography>
    ),
    UnidadPrimaria: (
      <MDTypography variant="caption" color="text">
        {factor.unit}
      </MDTypography>
    ),
    ValorUnitario: (
      <MDTypography variant="caption" color="text">
        {factor.unitCarbono}
      </MDTypography>
    ),
    ValorCarbon: (
      <MDTypography variant="caption" color="text">
        {actor.valueUnit}
      </MDTypography>
    ),
    Factoremisión: (
      <MDTypography variant="caption" color="text">
        {factor.valueEmision}
      </MDTypography>
    ),
    PCG: (
      <MDTypography variant="caption" color="text">
        {factor.valueUnit / factor.valueEmision}
      </MDTypography>
    ),
    Sector: (
      <MDTypography variant="caption" color="text">
        {factor.pcgNombre}
      </MDTypography>
    ),
    Fuente: (
      <MDTypography variant="caption" color="text">
        {getSectorName(factor.sector)}
      </MDTypography>
    ),
    estatus: (
      <MDTypography variant="caption" color="text">
        {getSectorName(factor.source)}
      </MDTypography>
    ),
    Acciones: (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Tooltip title="Editar">
          <IconButton
            size="small"
            color="info"
            onClick={() => handleEdit(factor)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(factor)}
          >
            <DeleteIcon fontSize="small" />
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

              <Grid item>
                <MDButton
                  variant="gradient"
                  color="info"
                  onClick={handleCreate}
                >
                  Crear Nuevo
                </MDButton>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar factores..."
                  size="medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white" align="left">
                      Factores de Emisión
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    {filteredFactors.length === 0 ? (
                      <Card
                        sx={{
                          p: 4,
                          textAlign: "center",
                          minHeight: "100px",
                          width: "1200px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontWeight="regular"
                        >
                          {searchTerm
                            ? "No se encontraron factores de emisión que coincidan con la búsqueda."
                            : "No hay factores de emisión registrados aún."}
                        </MDTypography>
                      </Card>
                    ) : (
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={true}
                        noEndBorder
                      />
                    )}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>

        <Footer />
      </MDBox>

      {/* Create/Edit Modal */}
      <EmissionFactorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingFactor={editingFactor}
        measurementUnits={measurementUnits}
        sectors={sectors}
        sources={sources}
        pcgs={pcgs}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation && (
        <div
          className="modal-overlay"
          onClick={() => setDeleteConfirmation(null)}
        >
          <div className="confirmation-dialog">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete "{deleteConfirmation.name}"?
              <br />
              This action cannot be undone.
            </p>
            <div className="confirmation-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteConfirmation(null)}
              >
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
export default EmissionFactorDashboard;
