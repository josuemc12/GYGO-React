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
          <Grid size={{xs:12}}>
            <Card sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{xs:12, md: 1}}>
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
                <Grid size={{xs:12, md:10}}>
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

          <Grid size={{xs:12}}>
            <AddConsumptionForm />
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}
