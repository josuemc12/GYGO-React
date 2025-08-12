import { useParams } from "react-router-dom";
import { AddMonthlyConsumForm } from "../components/AddMonthlyConsumForm";
import {
  Card,
  Grid,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Alert,
} from "@mui/material";
import { ArrowBackOutlined, ErrorOutline } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export function AddMonthlyConsumPage() {
  const { consumptionId } = useParams();
  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <Grid container spacing={3} sx={{mb: 5}}>
          <Grid size={{xs:12}}>
            <Card sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{xs:12, md:1}}>
                  <MDButton
                    variant="text"
                    color="black"
                    startIcon={<ArrowBackOutlined />}
                    onClick={() => history.back()}
                    sx={{ minWidth: "100%" }}
                  >
                    Volver
                  </MDButton>
                </Grid>
                <Grid size={{xs:12, md: 10}}>
                  <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                    Agregar Consumo Mensual
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Registrar un nuevo consumo mensual asociado al consumo seleccionado
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid size={{xs:12}}>
            <AddMonthlyConsumForm consumptionId={parseInt(consumptionId)} />
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}
