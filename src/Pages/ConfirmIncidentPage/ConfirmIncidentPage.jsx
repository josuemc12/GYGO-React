import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { appsettings } from "../../settings/appsettings";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {
  Card,
  CircularProgress,
  Grid,
  Alert,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


export const ConfirmIncidentPage = () => {

    const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Marcando...");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const incident_id = searchParams.get("id");
  useEffect(()=>{
    const markAsRead = async() =>{
        try{
            const response = await fetch(`${appsettings.apiUrl}emissionsIncident/mark-as-read/${incident_id}`,{
                method: "PATCH",
                credentials: "include"
            });
            if(response.ok){
                setStatus("Incidente marcado como leído correctamente.");
            }else{
                const data = await response.json();
                setError(data.message || "Error marcando el incidente");
            }
        }catch(err){
            setError("Error de red o servidor");
        }finally{
          setLoading(false);
        }
    };
     if (incident_id) {
      markAsRead();
    } else {
      setError("ID de incidente inválido.");
      setLoading(false);
    }
  }, [incident_id])

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container justifyContent="center"  sx={{my: 5}}>
          <Grid size={{xs:12, md:8, lg:6}}>
            <Card sx={{ p: 4, textAlign: "center" }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                Confirmación de Incidente
              </MDTypography>
              {loading ? (
                <MDBox mt={3}>
                  <CircularProgress />
                </MDBox>
              ) : error ? (
                <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
              ) : (
                <Alert severity="success" sx={{ mt: 2 }}>{status}</Alert>
              )}
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  )

} 