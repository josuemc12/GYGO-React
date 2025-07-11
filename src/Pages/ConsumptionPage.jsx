import { useState, useEffect } from "react";
import "../styles/consumption.css";
import { useNavigate } from "react-router-dom";
import {ConsumptionTable} from "../components/ConsumptionTable";
import { getConsumptions } from "../API/Consumptions/Consumption";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {Grid, Card, CardContent, Avatar, Box, Typography} from "@mui/material"
import {EnergySavingsLeaf} from "@mui/icons-material"
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export function ConsumptionPage() {
  const [consumos, setConsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsumos = async () => {
      setLoading(true);
      const result = await getConsumptions();
      setConsumos(result);
      setLoading(false);
    };
    fetchConsumos();
  }, []);
const handleAgregarConsumo = () => {
    navigate("/consumption/add");
  };

  const handleVerConsumoMensual = (consumo) => {
    navigate(`/consumption/monthly/${consumo.consumptionId}`, { state: consumo });
  };

  const handleEditarConsumo = (id) => {
    navigate(`/consumption/edit/${id}`);
  };

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Header + Botón */}
          <Grid item size={{ xs: 12 }}>
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
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <MDBox display="flex" flexDirection="column" gap={1}>
                      <MDTypography variant="h6">Consumos</MDTypography>
                      <MDTypography variant="body2" color="text">
                        Gestiona y monitorea todos los consumos de tu empresa
                        para calcular tu huella de carbono.
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item>
                    <MDButton onClick={handleAgregarConsumo}>
                      Agregar Consumo
                    </MDButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          

          {/* Tabla de Consumos */}
          <Grid item size={{ xs: 12 }} >
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white" align="left">
                  Registro de Consumos
                </MDTypography>
              </MDBox>
              <MDBox>
                <ConsumptionTable
                  consumos={consumos}
                  loading={loading}
                  onVerConsumoMensual={handleVerConsumoMensual}
                  onEditarConsumo={handleEditarConsumo}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}
