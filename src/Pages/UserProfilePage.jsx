import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBackOutlined,
  Group as GroupIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutSesion } from "../API/Auth";

export function UserProfilePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const data = await getCurrentUser();
        setUserInfo(data);
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChangePassword = () => {
    navigate("/ChangePasswordPage");
  };

  const handleLogout = async () => {
    try {
      await logoutSesion();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid size={{xs:12}}>
            <Card sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{xs:12}} >
                  <MDTypography variant="h4" fontWeight="bold">
                    Perfil de Usuario
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Información detallada del usuario actual
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {loading ? (
            <Grid size={{xs:12}}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
              </Card>
            </Grid>
          ) : (
            <>
              <Grid size={{xs:12, md:4}} >
                <Card sx={{ p: 3, display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "info.main", width: 56, height: 56, mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <div>
                    <MDTypography variant="subtitle2" color="text">
                      Usuario
                    </MDTypography>
                    <MDTypography variant="h6">{userInfo.username}</MDTypography>
                  </div>
                </Card>
              </Grid>

              <Grid size={{xs:12, md:4}} >
                <Card sx={{ p: 3, display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "info.main", width: 56, height: 56, mr: 2 }}>
                    <EmailIcon />
                  </Avatar>
                  <div>
                    <MDTypography variant="subtitle2" color="text">
                      Correo Electrónico
                    </MDTypography>
                    <MDTypography variant="h6">{userInfo.email}</MDTypography>
                  </div>
                </Card>
              </Grid>

              <Grid size={{xs:12, md:4}} >
                <Card sx={{ p: 3, display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "info.main", width: 56, height: 56, mr: 2 }}>
                    <GroupIcon />
                  </Avatar>
                  <div>
                    <MDTypography variant="subtitle2" color="text">
                      Grupo
                    </MDTypography>
                    <MDTypography variant="h6">
                      {userInfo.grupoNombre ? userInfo.grupoNombre : "No asignado"}
                    </MDTypography>
                  </div>
                </Card>
              </Grid>

              <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid item xs={6}>
                  <Card sx={{ p: 3, textAlign: "center" }}>
                    <MDButton
                      variant="contained"
                      color="info"
                      startIcon={<LockIcon />}
                      onClick={handleChangePassword}
                    >
                      Cambiar Contraseña
                    </MDButton>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ p: 3, textAlign: "center" }}>
                    <MDButton
                      variant="contained"
                      color="error"
                      startIcon={<ExitToAppIcon />}
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </MDButton>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}
