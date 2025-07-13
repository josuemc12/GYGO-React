import React, { useEffect, useState } from 'react'
import { ChangePasswordForm } from '../components/ChangePasswordForm'
import { jwtDecode } from 'jwt-decode';
import { Card,
  Grid,
  CircularProgress,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  Button, } from '@mui/material';
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export const ChangePasswordPage = () => {

  const [username, setUsername] = useState("");

  useEffect(()=>{
      const fetchUsername = async( ) => {
        try {
          const response = await fetch("http://localhost:7217/api/User/UserProfile",
            {
              method: "GET",
              credentials: "include"
            }
          );
          if(!response.ok){
            throw new Error("Error al traer la información del usuario.")
          }

          const data = await response.json();
          setUsername(data.username);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      fetchUsername();
  }, [])

  
  return (
    <DashboardLayout>
      <MDBox py={3} mb={4}>
        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item size={{xs:12, md:8, lg:6}}>
            <Card sx={{p: 4}}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                Cambiar contraseña | {username || "Usuario"}
              </MDTypography>
              <ChangePasswordForm></ChangePasswordForm>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    <Footer />
    </DashboardLayout>
  )
}
