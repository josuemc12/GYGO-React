import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  FormControl,
    CircularProgress,
  
  
  
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { PostChangePassword } from "../../API/ChangePassword";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";


const theme = createTheme({
  palette: {
    primary: { main: "#2DA14C" },
    secondary: { main: "#ffffff" },
    background: { default: "#f9f9f5" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  shape: { borderRadius: 12 },
});

const Paper = styled("div")(({ theme }) => ({
  padding: "40px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
}));


export const ChangePassword = () => {
     const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const UserDTO = {
      email: email,
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
    };
    try {
      const result = await PostChangePassword(UserDTO);
      setLoading(false);

      if (!currentPassword || !newPassword) {
        Swal.fire({
          icon: "warning",
          title: "No se pudo cambiar la contraseña",
          text: "Por favor, completá todos los campos.",
          confirmButtonColor: "#f8bb86",
        });
        return;
      }

      console.log(result);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Cambio de contraseña exitoso",
          text: "El cambio de contraseña se cambiocorrectamente.",
          confirmButtonColor: "#2DA14C",
        }).then(() => {
          window.location.href = "/Login";
        });
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al cambiar la contraseña",
          text: result.error.message,
          confirmButtonColor: "#d33",
        });
        return;
      }

      //navigate("/DashboardGroupPage");
    } catch (error) {}
  };

  return (
    <>

      <ThemeProvider theme={theme}>
  <CssBaseline />
  <Box
    component="form"
                onSubmit={handleSubmit}


    sx={{
      backgroundColor: "background.default",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: 2,
    }}
  >
    <Container maxWidth="xs">
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center" mb={2}>
          <img
            src="/src/assets/Logo.png"
            alt="Logo"
            style={{ maxWidth: "120px" }}
          />
        </Box>

        <Box textAlign="center" mb={5}>
          <Typography variant="h4" fontWeight={600} color="primary">
            Cambiar Contraseña
          </Typography>
        </Box>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-email" sx={{ fontSize: "1.1rem" }}>
              Correo Electrónico
            </InputLabel>
            <OutlinedInput
             onChange={(e) => setEmail(e.target.value)}
              id="outlined-email"
              type="email"
              required
              label="Correo Electrónico"
              sx={{ fontSize: "1.1rem" }}
            />
          </FormControl>
      

            <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Contraseña Actual
                  </InputLabel>
                  <OutlinedInput
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    // debo comentar esto
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Ocultar la contraseña" : "Mostrar la contraseña"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    } // hasta aqui
                    label="Contraseña actual"
                  />
                </FormControl>





          <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password2">
                              Nueva Contraseña
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                              id="outlined-adornment-password2"
                              type={showPassword ? "text" : "password"}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label={
                                      showPassword ? "Ocultar la contraseña" : "Mostrar la contraseña"
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Nueva Contraseña"
                            />
                          </FormControl>

          <Button
            type="submit"
           
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
          >
            {loading ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              "Actualizar Contraseña"
            )}
          </Button>
       
      </Paper>
    </Container>
  </Box>
</ThemeProvider>
   
    </>
  );
};
