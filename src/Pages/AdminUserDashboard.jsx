import { useState, useEffect } from "react";
import UserTable from "../components/UserAdminTable";
import InviteModal from "../components/InviteModal";
import {
  getGroupUsers,
  sendUserInvite,
  removeUserFromGroup,
  fetchGroupId
} from "../API/Admin";
import {
  getDeleteUsers,
  getCountUserDelete
} from "../API/DeleteLogs";
import "../App.css";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
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
  //var GROUP_ID = fetchGroupId();

useEffect(() => {
  fetchUsersEmail();
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
      console.log(userData);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersEmail = async () => {
    try {

      const userData = await getCountUserDelete();

    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleInviteUser = async (email) => {
    try {
      setInviteLoading(true);
      setError("");

      await sendUserInvite(email);

      setSuccessMessage(`Invitation sent to ${email} successfully!`);
      setInviteModalOpen(false);

      fetchUsers();

      setTimeout(() => setSuccessMessage(""), 3000);
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

      setSuccessMessage("User removed successfully!");

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to remove user. Please try again.");
      console.error("Error removing user:", err);

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
        {"Member"}
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
            onClick={() => handleRemoveClick(user.id, user.name)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));


const historyDeleteUsers = [
  { Header: "Usuario Eliminado", accessor: "userName", align: "left" },
  { Header: "Email", accessor: "email", align: "left" },
  { Header: "Fecha Eliminado", accessor: "deletedAt", align: "center" },
  { Header: "Admin", accessor: "deletedByAdminName", align: "left" },
];

const fetchDeleteLogs = async () => {
  try {
    const logs = await getDeleteUsers(); // tu API aquí
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
              <Grid item>
                <MDBox display="flex" alignItems="center" gap={1}>
                  <FilterAltOutlinedIcon fontSize="medium" />
                  <MDTypography variant="h6">Filtros y Acciones</MDTypography>
                </MDBox>
              </Grid>

              <Grid item>
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
                  + Invite User
                </MDButton>
              </Grid>
            </Grid>
            {/* Stats Cards */}
            <div className="stats-grid" style={{ marginTop: "3rem" }}>
              <div className="stat-card">
                <div className="stat-value">{users.length}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {users.filter((user) => user.status === "active").length}
                </div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {users.filter((user) => user.status === "pending").length}
                </div>
                <div className="stat-label">Pending Invites</div>
              </div>
            </div>
          </MDBox>

          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
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
                    pt={3}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      minHeight: "100px",
                      width: "1200px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                      {showHistory ? (
            // 🔁 AQUI VA LA TABLA DE HISTORIAL
            <DataTable
              table={{ columns: historyDeleteUsers, rows: historyRows }}
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

// <div className="admin-dashboard">
//     {/* Dashboard Header */}
//     <div className="dashboard-header">
//       <div className="header-content">
//         <h1>Group Users</h1>
//       </div>
//       <button
//         className="btn btn-primary"
//         onClick={() => setInviteModalOpen(true)}
//       >
//         + Invite User
//       </button>
//     </div>

//     {/* Status Messages */}
//     {error && (
//       <div className="alert alert-error">
//         <span>{error}</span>
//         <button onClick={clearError} className="alert-close">
//           ×
//         </button>
//       </div>
//     )}

//     {successMessage && (
//       <div className="alert alert-success">
//         <span>{successMessage}</span>
//       </div>
//     )}

//     {/* Stats Cards */}
//     <div className="stats-grid">
//       <div className="stat-card">
//         <div className="stat-value">{users.length}</div>
//         <div className="stat-label">Total Users</div>
//       </div>
//       <div className="stat-card">
//         <div className="stat-value">
//           {users.filter((user) => user.status === "active").length}
//         </div>
//         <div className="stat-label">Active Users</div>
//       </div>
//       <div className="stat-card">
//         <div className="stat-value">
//           {users.filter((user) => user.status === "pending").length}
//         </div>
//         <div className="stat-label">Pending Invites</div>
//       </div>
//     </div>

//     {/* User Table */}
//     <UserTable
//       users={users}
//       onRemoveUser={handleRemoveUser}
//       loading={loading}
//     />

//     {/* Invite Modal */}
//     <InviteModal
//       isOpen={inviteModalOpen}
//       onClose={() => setInviteModalOpen(false)}
//       onInvite={handleInviteUser}
//       loading={inviteLoading}
//     />
//   </div>
