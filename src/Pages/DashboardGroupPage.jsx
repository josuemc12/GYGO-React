import React, { useEffect, useState } from 'react';
import "../styles/DashboardGPage.css";
import { ModernDashboardCards } from '../components/DashboardsCards';
import BadgeIcon from '@mui/icons-material/Badge';
import { appsettings } from '../settings/appsettings';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card,Grid, CardContent } from '@mui/material';


export const DashboardGroupPage = () => {

    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${appsettings.apiUrl}User/UserProfile`, {
                method: "GET",
                credentials: "include",
            }
            );
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);

            }
        }
        fetchData();
    }, [])

    return (
        <>
            <DashboardLayout>
                <MDBox
                    sx={{
                        minHeight: "100vh",
                        p: 3,
                    }}
                >
                    <MDBox sx={{ maxWidth: 1200, mx: "auto" }}>
                        <Grid item size={12} sx={{mb: 3}}>
                            <Card
                                sx={{
                                    background: "#ffffff",
                                    borderRadius: 2,
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                                    border: "1px solid #e5e7eb",
                                }}
                            >
                                <CardContent sx={{ py: 4, px: 5 }}>
                                    <MDBox textAlign="center">
                                        <MDTypography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,
                                                color: "#111827",
                                                textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                                            }}
                                        >
                                            ¡Hola, {username ? username : "Usuario"}! 👋
                                        </MDTypography>
                                        <MDTypography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 400,
                                                color: "#6b7280",
                                            }}
                                        >
                                            Bienvenido de nuevo a tu dashboard
                                        </MDTypography>
                                    </MDBox>
                                </CardContent>
                            </Card>
                        </Grid>


                        <ModernDashboardCards />
                    </MDBox>
                </MDBox>
                <Footer></Footer>
            </DashboardLayout>
        </>
    )
}
