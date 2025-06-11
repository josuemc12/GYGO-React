import React, { useState } from 'react';
import { Login } from "../API/Login";
import { useNavigate } from "react-router-dom";
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
} from '@mui/material';

import { ThemeProvider, createTheme, styled } from '@mui/material/styles';


import Swal from 'sweetalert2';

// Tema personalizado con palette primary y secondary
const theme = createTheme({
  palette: {
    primary: { main: '#F5B62A' },
    secondary: { main: '#383938' },
  },
});

// Styled container similar a tu clase paper
const Paper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow:
    '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
}));

export function LoginPrueba() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo iniciar sesión',
        text: 'Por favor, completá todos los campos.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    try {
      const result = await Login(email,password);
      console.log(result);
      if (result) {
         navigate("/DashboardGroupPage");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Usuario o contraseña incorrectos',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo conectar con el servidor, intentá nuevamente más tarde.',
        confirmButtonColor: '#d33',
      });
      
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={9} textAlign="center">
              {/* Si tienes un logo, importalo arriba y usa aquí */}
              {/* <img src={Logo} alt="Logo" style={{ maxWidth: '300px' }} /> */}
              <Typography variant="h4" fontWeight={600} mb={1}>
                SIGN IN
              </Typography>
              <Typography variant="body1" mb={2}>
                Sign into your account
              </Typography>
            </Grid>

            <Grid item xs={9}>
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              
                />

                {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
            </Grid>

            <Grid item xs={9} textAlign="center">
              <Link href="#" variant="body2" color="secondary" underline="hover">
                Forgot your password?
              </Link>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
