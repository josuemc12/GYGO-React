import {
  AddOutlined,
  ErrorOutline,ArrowBackOutlined
} from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import { AddConsumptionForm } from "../components/AddConsumptionForm";
import "../styles/AddConsumption.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import {
  Card,
  Grid,
  MenuItem,
  CircularProgress,
  TextField,
  Alert,
} from "@mui/material";

export function AddConsumptionPage() {
  const navigate = useNavigate();



  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3} sx={{mb:5}}>
          <Grid item size={{xs:12}}>
            <Card sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item size={{xs:12, md: 1}}>
                  <MDButton
                    variant="text"
                    color="black"
                    startIcon={<ArrowBackOutlined />}
                    onClick={() => navigate(-1)}
                    sx={{ minWidth: "100%" }}
                  >
                    Volver
                  </MDButton>
                </Grid>
                <Grid item size={{xs:12, md:10}}>
                  <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                    Agregar Consumo
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Registra un nuevo consumo para calcular su impacto en la huella de carbono
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item size={{xs:12}}>
            <AddConsumptionForm />
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}


/* 
import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowBackOutlined, AddOutlined, CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { getFactoresEmision } from "../API/FactorEmision";
import { addConsumption } from "../API/Consumptions/Consumption";
import { useNavigate } from "react-router-dom";

export function AddConsumptionPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", factorEmisionId: "" });
  const [factoresEmision, setFactoresEmision] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchFactores = async () => {
      try {
        const response = await getFactoresEmision();
        setFactoresEmision(response);
      } catch (error) {
        console.error("Error cargando factores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFactores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.factorEmisionId) newErrors.factorEmisionId = "Seleccione un factor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const consumo = {
        name: formData.name,
        factorEmisionId: parseInt(formData.factorEmisionId),
      };

      await addConsumption(consumo);
      setShowSuccess(true);
      setFormData({ name: "", factorEmisionId: "" });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error al guardar:", err);
      setErrors({ submit: "Error al guardar. Intente de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>

          <Grid item size={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2} alignItems="start" spacing={2}>
                <Grid item size={{ xs: 12, md: 6 }} >
                  <MDButton
                    variant="text"
                    color="black"
                    startIcon={<ArrowBackOutlined />}
                    onClick={() => navigate("/consumption")}
                    sx={{ mb: 2 }}
                  >
                    Volver
                  </MDButton>
                </Grid>
              </Grid>

              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                Agregar Consumo
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Registra un nuevo consumo para calcular su impacto en la huella de carbono
              </MDTypography>
              <MDBox mt={3} component="form" onSubmit={handleSubmit}>
                {showSuccess && (
                  <Alert severity="success" icon={<CheckCircleOutline />} sx={{ mb: 2 }}>
                    ¡Consumo agregado exitosamente!
                  </Alert>
                )}

                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <MDInput
                      fullWidth
                      label="Nombre *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth error={!!errors.factorEmisionId}>
                      <InputLabel>Factor de Emisión *</InputLabel>
                      <Select
                        name="factorEmisionId"
                        value={formData.factorEmisionId}
                        label="Factor de Emisión *"
                        onChange={handleChange}
                        heig
                      >
                        <MenuItem value="">Seleccione un factor</MenuItem>
                        {factoresEmision.map((f) => (
                          <MenuItem key={f.id} value={f.id}>
                            {f.name} ({f.unitCarbono})
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.factorEmisionId && (
                        <MDTypography variant="caption" color="error">
                          {errors.factorEmisionId}
                        </MDTypography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                {errors.submit && (
                  <Alert severity="error" icon={<ErrorOutline />} sx={{ mt: 2 }}>
                    {errors.submit}
                  </Alert>
                )}

                <MDBox mt={3} display="flex" justifyContent="flex-end">
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="success"
                    startIcon={<AddOutlined />}
                    disabled={submitting}
                  >
                    {submitting ? "Agregando..." : "Agregar Consumo"}
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

*/