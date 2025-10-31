import { useState, useEffect } from "react";
import UserTable from "../components/UserAdminTable";
import InviteModal from "../components/InviteModal";
import {
  getGroupUsers,
  sendUserInvite,
  removeUserFromGroup,
  fetchGroupId,
} from "../API/Admin";
import { getDeleteUsers, EmailDeleteUsers, getCountUserDelete } from "../API/DeleteLogs";
import "../App.css";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { DeleteOutlineOutlined } from "@mui/icons-material";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import {
  Grid,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Modal,
  Switch,
  TextField,
  InputLabel,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
} from "@mui/material";

import { refreshLogin } from "../API/Auth";

const AdminUserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [historyRows, setHistoryRows] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);


  //var GROUP_ID = fetchGroupId();

  useEffect(() => {
    fetchUsersEmail();
    fetchCountUserDelete();
  }, []); // Solo se ejecuta una vez al montar

  useEffect(() => {
    if (showHistory) {
      fetchDeleteLogs();
    } else {
      fetchUsers();
    }
  }, [showHistory]);




  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const userData = await getGroupUsers();
     
      setUsers(userData);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };


  //#region DeleteLogs
  const fetchUsersEmail = async () => {
    try {
      const userData = await EmailDeleteUsers();
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };


  const fetchCountUserDelete = async () => {
    try {
     const count = await getCountUserDelete();
     setDeleteCount(count); 
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeleteLogs = async () => {
    try {
      const logs = await getDeleteUsers(); 
      setDeleteCount(logs.length);
      const rows = logs.map((log) => ({
        userName: log.userName,
        email: log.email,
        deletedAt: new Date(log.deletedAt).toLocaleDateString(),
        deletedByAdminName: log.deletedByAdminName || "N/A",
      }));
      setHistoryRows(rows);
    } catch (error) {
      console.error("Error loading delete history", error);
    }
  };
  //#endregion

  const handleInviteUser = async (email) => {
    try {
      setInviteLoading(true);
      setError("");

      await sendUserInvite(email);

      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        icon: "success",
        title: "invitación enviada",
        text: `Invitación enviada exitosamente a ${email}`,
        timer: 3000,
        showConfirmButton: false,
      });
      setInviteModalOpen(false);

      fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to send invitation. Please try again.");
      console.error("Error sending invite:", err);
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      setError("");

      await removeUserFromGroup(userId);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        text: "¡El usuario fue eliminado exitosamente!",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar usuario",
        text: "No se pudo eliminar el usuario. Por favor, inténtalo de nuevo.",
        timer: 3000,
        showConfirmButton: false,
      });

      fetchUsers();
    }
  };

  const clearError = () => setError("");

  const columns = [
    { Header: "Nombre", accessor: "username", align: "left" },
    { Header: "Correo", accessor: "email", align: "left" },
    {
      Header: "Rol",
      accessor: "role",
      align: "center",
    },
    // { Header: "Estado", accessor: "Estado", align: "center" },
    { Header: "Acciones", accessor: "action", align: "center" },
  ];

  const rows = users.map((user) => ({
    username: (
      <MDTypography variant="caption" fontWeight="medium">
        {user.username}
      </MDTypography>
    ),
    email: (
      <MDTypography variant="caption" color="text">
        {user.email}
      </MDTypography>
    ),
    role: (
      <MDTypography variant="caption" color="text">
        {"Miembro"}
      </MDTypography>
    ),

    action: (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleRemoveUser(user.id, user.name)}
          >
            <DeleteOutlineOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));

  const historyDeleteUsers = [
    { Header: "Usuario Eliminado", accessor: "userName", align: "left" },
    { Header: "Correo", accessor: "email", align: "left" },
    { Header: "Fecha Eliminado", accessor: "deletedAt", align: "center" },
    { Header: "Administrador", accessor: "deletedByAdminName", align: "left" },
  ];


  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
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
              <Grid>
                <MDBox display="flex" alignItems="center" gap={1}>
                  <FilterAltOutlinedIcon fontSize="medium" />
                  <MDTypography variant="h6">Filtros y Acciones</MDTypography>
                </MDBox>
              </Grid>

              <Grid>
                {/* <MDButton
                  variant="outlined"
                  sx={{
                    mr: 2,
                    borderColor: "#4CAF50",
                    color: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#E8F5E9",
                      borderColor: "#43A047",
                      color: "#388E3C",
                    },
                  }}
                  onClick={() => setShowHistory(false)}
                >
                  Usuarios
                </MDButton>









                <MDButton
                  variant="outlined"
                  sx={{
                    mr: 2,
                    borderColor: "#e41414ff",
                    color: "#e41414ff",
                    "&:hover": {
                      backgroundColor: "#f5e8e8ff",
                      borderColor: "#d41313ff",
                      color: "#ac2020ff",
                    },
                  }}
                  onClick={() => setShowHistory(true)}
                >
                  Historial
                </MDButton> */}

                <MDButton
                  variant="outlined"
                  sx={{
                    mr: 2,
                    borderColor: "#4CAF50",
                    color: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#E8F5E9",
                      borderColor: "#43A047",
                      color: "#388E3C",
                    },
                  }}
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? "Usuarios" : "Historial de Eliminaciones"}
                </MDButton>

                <MDButton
                  variant="outlined"
                  sx={{
                    borderColor: "#4CAF50",
                    color: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#E8F5E9",
                      borderColor: "#43A047",
                      color: "#388E3C",
                    },
                  }}
                  onClick={() => {
                    setShowHistory(false);
                    setInviteModalOpen(true);
                  }}
                >
                  + Invitar
                </MDButton>
              </Grid>
            </Grid>
            {/* Stats Cards */}
          <div className="stats-grid" style={{ marginTop: "3rem" }}>
  <div className="stat-card">
    <div className="stat-value">{users.length}</div>
    <div className="stat-label">Usuarios Activos</div>
  </div>
  <div className="stat-card">
    <div className="stat-value">{deleteCount}</div>
    <div className="stat-label">Usuarios Eliminados</div>
  </div>
</div>
          </MDBox>

          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
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
                  >
                    <MDTypography variant="h6" color="white" align="left">
                      {showHistory ? "Historial de Eliminaciones" : "Usuarios"}
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    pt={3} px={3} pb={3}
                  >
                    {showHistory ? (
                      // 🔁 AQUI VA LA TABLA DE HISTORIAL
                      <DataTable
                        table={{
                          columns: historyDeleteUsers,
                          rows: historyRows,
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={true}
                        noEndBorder
                      />
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

        <InviteModal
          isOpen={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
          onInvite={handleInviteUser}
          loading={inviteLoading}
        />
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
};

export default AdminUserDashboard;
