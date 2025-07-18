import React, { useEffect, useState } from "react";
import { TextField, Grid, Box, Card } from "@mui/material";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
import DataTable from "../examples/Tables/DataTable";
import { GetServices } from "../API/Reports";
import { useAuth } from "../context/AuthContext";

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [tableRows, setTableRows] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchServices = async () => {
            const data = await GetServices();

            // Flatten services into rows
            const flattenedRows = data.flatMap((service) =>
                service.grupos.map((grupo) => ({
                    serviceName: service.serviceName,
                    serviceId: service.serviceId,
                    groupName: grupo.nombre,
                    groupId: grupo.grupoId,
                }))
            );

            setServices(flattenedRows);
            setTableRows(flattenedRows);
        };

        fetchServices();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = services.filter((row) =>
                row.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.groupName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setTableRows(filtered);
        } else {
            setTableRows(services);
        }
    }, [searchTerm, services]);

    // Define columns for the DataTable
    const columns = [
        { Header: "Servicio", accessor: "serviceName" },

        { Header: "Grupo", accessor: "groupName" },
        ,
    ];

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
        </DashboardLayout>
    );
}
