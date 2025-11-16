import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Avatar,
  CircularProgress,
  Modal,
  Stack,
  TextField,
  Box,
  Dialog, DialogTitle, DialogContent
} from "@mui/material";
import {
  ArrowBackOutlined,
  Group as GroupIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  ManageAccounts as ManageAccountsIcon
} from "@mui/icons-material";
import MDBox from "components/MDBox";
import Swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../API/Auth";
import { ChangeProfileUser } from "../API/User"

export function UserProfilePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    userName: "",
    email: ""
  });


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
  const handleOpenEditModal = () => {
    setEditForm({
      userName: userInfo.username,
      email: userInfo.email,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    if(editForm.email === "" || editForm.userName === ""){
      Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Los campos deben estar llenos",
        });
        setSaving(false);
        return;
    }
    try {
      const response = await ChangeProfileUser({
        userName: editForm.userName,
        email: editForm.email
      });

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: response.message,
        });

        setOpenEditModal(false);

        const data = await getCurrentUser();
        setUserInfo(data);

      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Ocurrió un error"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12 }} >
                  <MDTypography variant="h4" fontWeight="bold">
                    Perfil de usuario
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Información detallada sobre tu cuenta
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {loading ? (
            <Grid size={{ xs: 12 }}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
              </Card>
            </Grid>
          ) : (
            <>
              <Grid size={{ xs: 12, md: 4 }} >
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

              <Grid size={{ xs: 12, md: 4 }} >
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

              <Grid size={{ xs: 12, md: 4 }} >
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

              <Grid size={{ xs: 12 }} sx={{ mb: 5 }}>
                <Card sx={{ p: 3, textAlign: "right" }}>
                  <MDButton
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="info"
                    startIcon={<LockIcon />}
                    onClick={handleChangePassword}
                  >
                    Cambiar Contraseña
                  </MDButton>
                  <MDButton
                    variant="contained"
                    color="success"
                    startIcon={<ManageAccountsIcon />}
                    onClick={handleOpenEditModal}
                  >
                    Cambiar información del perfil
                  </MDButton>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
        <Footer />
      </MDBox>
      <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth
      maxWidth="md" >
         <DialogTitle>
          <MDTypography variant="h5" fontWeight="bold" color="dark">
              Editar Perfil
          </MDTypography>
         </DialogTitle>
           <DialogContent sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Nombre de Usuario"
            margin="normal"
            value={editForm.userName}
            onChange={(e) =>
              setEditForm({ ...editForm, userName: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Correo"
            margin="normal"
            value={editForm.email}
            onChange={(e) =>
              setEditForm({ ...editForm, email: e.target.value })
            }
          />

          <Stack direction="row" spacing={2} mt={3}>
            <MDButton
              fullWidth
              color="info"
              variant="contained"
              onClick={handleSaveProfile}
            >
              {saving ? <CircularProgress size={24} color="inherit" /> : "Guardar"}
            </MDButton>

            <MDButton
              fullWidth
              color="error"
              variant="contained"
              onClick={handleCloseEditModal}
            >
              Cancelar
            </MDButton>
          </Stack>
          </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}
