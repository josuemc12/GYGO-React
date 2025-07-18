import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getMonthlyConsumptions } from "../API/Consumptions/MonthlyConsum";
import { ArrowBackOutlined, Add } from "@mui/icons-material";
import {
  Grid,
  Card,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import "../styles/monthlyConsum.css";
import { MonthlyConsumptionTable } from "../components/MonthlyConsumTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const meses = [
  { value: "", label: "Todos los meses" },
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const años = [
  { value: "", label: "Todos los años" },
  { value: 2025, label: "2025" },
  { value: 2024, label: "2024" },
  { value: 2023, label: "2023" },
];

export function MonthlyConsumptionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const consumoInfo = location.state;

  const [consumosMensuales, setConsumosMensuales] = useState([]);
  const [consumosFiltrados, setConsumosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ mes: "", año: "" });

   const handleAddMonthlyConsumption = () => {
    navigate(`/consumption/monthly/add/${id}`);
  };

  useEffect(() => {
    const fetchMonthlyConsumption = async () => {
      setLoading(true);
      const result = await getMonthlyConsumptions(id);
      setConsumosMensuales(result);
      setLoading(false);
    };
    fetchMonthlyConsumption();
  }, [id]);

  useEffect(() => {
    let datosFiltrados = [...consumosMensuales];
    if (filtros.mes !== "") {
      datosFiltrados = datosFiltrados.filter(c => c.month === Number(filtros.mes));
    }
    if (filtros.año !== "") {
      datosFiltrados = datosFiltrados.filter(c => c.year === Number(filtros.año));
    }
    setConsumosFiltrados(datosFiltrados);
  }, [filtros, consumosMensuales]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFiltros = () => setFiltros({ mes: "", año: "" });

  const calcularTotales = () => {
    return consumosFiltrados.reduce(
      (acc, consumo) => ({
        cantidad: acc.cantidad + consumo.amount,
        emisiones: acc.emisiones + consumo.emissions,
      }),
      { cantidad: 0, emisiones: 0 }
    );
  };

  const totales = calcularTotales();

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <Card sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item size={{ xs: 12, md: 1 }}>
                  <MDButton
                    variant="text"
                    color="black"
                    startIcon={<ArrowBackOutlined />}
                    onClick={() => navigate("/consumption")}
                    sx={{ minWidth: "100%" }}
                  >
                    Volver
                  </MDButton>
                </Grid>
                <Grid item size={{ xs: 12, md: 10 }}>
                  <MDTypography variant="h4" fontWeight="bold">
                    Consumo Mensual
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    {consumoInfo
                      ? `Detalle mensual de: ${consumoInfo.name}`
                      : "Detalle de consumos por mes y año"}
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Cuadros de resumen */}
          {[{
            label: "Total Registros",
            value: consumosFiltrados.length,
          },
          {
            label: "Cantidad Total",
            value: `${totales.cantidad.toFixed(2)} kWh`,
          },
          {
            label: "Emisiones Totales",
            value: `${totales.emisiones.toFixed(2)} kg`,
          },
          {
            label: "Promedio Mensual",
            value:
              consumosFiltrados.length > 0
                ? `${(totales.emisiones / consumosFiltrados.length).toFixed(2)} kg`
                : "0 kg",
          }].map((item, index) => (
            <Grid item size={{ xs: 12, md: 6, lg: 3 }} key={index}>
              <Card sx={{ p: 2, borderLeft: "4px solid #376D4F" }}>
                <MDTypography variant="body2" color="text" fontWeight="bold">
                  {item.label}
                </MDTypography>
                <MDTypography variant="h6">{item.value}</MDTypography>
              </Card>
            </Grid>
          ))}

          {/* Filtros */}
          <Grid item size={{ xs: 12 }} sx={{mb: 4}}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item size={{ xs: 12, md: 5 }} >
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="mes-label">Mes</InputLabel>
                    <Select
                    id="mes-select"
                    labelId="mes-label"
                      name="mes"
                      value={filtros.mes}
                      label="Mes"
                      sx={{height: 40}}
                      onChange={(e) =>
                        setFiltros((prev) => ({ ...prev, mes: e.target.value }))
                      }
                    >
                      {meses.map((mes) => (
                        <MenuItem key={mes.value} value={mes.value}>
                          {mes.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item size={{ xs: 12, md: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel>Año</InputLabel>
                    <Select
                      name="año"
                      sx={{height: 40}}
                      value={filtros.año}
                      label="Año"
                      onChange={(e) =>
                        setFiltros((prev) => ({ ...prev, año: e.target.value }))
                      }
                    >
                      {años.map((año) => (
                        <MenuItem key={año.value} value={año.value}>
                          {año.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item size={{ xs: 12, md: 2 }}>
                  <MDButton variant="outlined" onClick={limpiarFiltros} color="secondary">
                    Limpiar Filtros
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Tabla */}
          <Grid item size={{ xs: 12 }} sx={{mb:3}}>
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
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <MDTypography variant="h6" color="white">
                  Registros Mensuales
                </MDTypography>
                <MDButton variant="contained" onClick={handleAddMonthlyConsumption} color="light">
                  <Add fontSize="small" sx={{ mr: 1 }} /> Agregar Mensual
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <MonthlyConsumptionTable
                  consumos={consumosFiltrados}
                  loading={loading}
                  consumptionId={id}
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
