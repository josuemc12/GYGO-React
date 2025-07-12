import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CircularProgress,
  Divider,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { getGrupoProfile } from "../API/Group";


export function GrupoProfilePage() {
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const result = await getGrupoProfile();
        setGrupo(result);
      } catch (error) {
        console.error("Error al cargar el perfil del grupo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrupo();
  }, []);

  const formatFecha = (fechaISO) => {
    return new Date(fechaISO).toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getServicioNombre = (id) => {
    switch (id) {
      case 1:
        return "Bandera Azul";
      case 2:
        return "Huella de Carbono";
      default:
        return "No especificado";
    }
  };

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3} sx={{mb:5}}>
          <Grid item size={{xs:12}}>
            <Card sx={{ p: 3 }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                Perfil del Grupo
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Información del grupo registrado en el sistema
              </MDTypography>
            </Card>
          </Grid>

          {loading ? (
            <Grid item size={{xs:12}}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
              </Card>
            </Grid>
          ) : (
            <>
              <Grid item size={{xs:12, md:6}} >
                <Card sx={{ p: 3 }}>
                  <MDTypography variant="subtitle2" color="text">
                    Nombre del Grupo
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="medium">
                    {grupo.nombre}
                  </MDTypography>

                  <Divider sx={{ my: 2 }} />

                  <MDTypography variant="subtitle2" color="text">
                    Correo Electrónico
                  </MDTypography>
                  <MDTypography variant="body1">{grupo.correo}</MDTypography>
                </Card>
              </Grid>

              <Grid item size={{xs:12, md:6}} >
                <Card sx={{ p: 3 }}>
                  <MDTypography variant="subtitle2" color="text">
                    Fecha de Creación
                  </MDTypography>
                  <MDTypography variant="body1">
                    {formatFecha(grupo.fechaCreación)}
                  </MDTypography>

                  <Divider sx={{ my: 2 }} />

                  <MDTypography variant="subtitle2" color="text">
                    Servicio Asociado
                  </MDTypography>
                  <MDTypography variant="body1">
                    {getServicioNombre(grupo.idService)}
                  </MDTypography>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}
