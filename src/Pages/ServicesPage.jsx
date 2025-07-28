import React, { useEffect, useState } from "react";
import { TextField, Grid, Box, Card, IconButton } from "@mui/material";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
import DataTable from "../examples/Tables/DataTable";
import { GetServices } from "../API/Reports";
import { useAuth } from "../context/AuthContext";
import CancelIcon from "@mui/icons-material/Cancel";
import SuperAdminCancelModal from "../components/SuperAdminCancelModal";
import {cancelAdminSubscription} from "../API/Subscription"

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [tableRows, setTableRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const { userId, role } = useAuth();

    useEffect(() => {
        const fetchServices = async () => {
            const data = await GetServices();
            const flattenedRows = data.flatMap((service) =>
                service.grupos.map((grupo) => ({
                    serviceName: service.serviceName,
                    serviceId: service.serviceId,
                    groupName: grupo.nombre,
                    groupId: grupo.grupoId,
                    actions: grupo.grupoId
                }))
            );
            setServices(flattenedRows);
            setTableRows(flattenedRows);
        };
        fetchServices();
        console.log(toString(role));
    }, []);

    // Update columns to include actions
    const columns = [
        { Header: "Servicio", accessor: "serviceName" },
        { Header: "Grupo", accessor: "groupName" },
        {
            Header: "Acciones",
            accessor: "actions",
            Cell: ({ value }) => (
                role === "SA" && ( // Only show for super admin
                    <IconButton 
                        color="error" 
                        onClick={() => {
                            setSelectedGroup(value);
                            setModalOpen(true);
                            
                        }}
                        size="small"
                    >
                        <CancelIcon fontSize="small" />
                        <MDTypography variant="caption" ml={1}>
                            Cancelar
                        </MDTypography>
                    </IconButton>
                )
            ),
            align: "center"
        }
    ];

    const handleCancelConfirm = async (groupId, reason) => {
        try {

            await cancelAdminSubscription(groupId, reason);

            const data = await GetServices();
            const flattenedRows = data.flatMap((service) =>
            service.grupos.map((grupo) => ({
                serviceName: service.serviceName,
                serviceId: service.serviceId,
                groupName: grupo.nombre,
                groupId: grupo.grupoId,
                actions: grupo.grupoId
            }))
            );
            setServices(flattenedRows);
            setTableRows(flattenedRows);
            
            return true;
        } catch (error) {
            console.error("Error al cancelar:", error);
            throw error;
        }
        };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3} >
                <MDTypography variant="h4" fontWeight="bold" mb={2}>
                    Servicios por grupo
                </MDTypography>
                <TextField
                    label="Buscar servicios o grupos"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card >
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
                                        Servicios
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3} >
                                    <MDBox pt={3} sx={{
                                        width: "100%",
                                        overflowX: "auto",
                                        "& table": {
                                            width: "100%",
                                            tableLayout: "fixed",
                                        }
                                    }}>
                                        <DataTable
                                            table={{ columns, rows: tableRows }}
                                            isSorted
                                            entriesPerPage
                                            showTotalEntries
                                            noEndBorder
                                        />
                                    </MDBox>
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            <SuperAdminCancelModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleCancelConfirm}
                groupId={selectedGroup}
            />
        </DashboardLayout>
    );
}
