import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
//import { useAuth } from '../../AuthContext';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/Auth";
import { RequestPasswordReset } from "../../API/ChangePassword";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import { PublicHeader } from "../../components/PublicHeader";

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
})

const Paper = styled("div")(({ theme }) => ({
  padding: "40px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
}))

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [emailReset, setEmailReset] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "No se pudo iniciar sesión",
        text: "Por favor, completá todos los campos.",
        confirmButtonColor: "#f8bb86",
      });
      return;
    }

    try {
      const { success, isTwoFactor, tempToken, error, rol, id } =
        await loginUser(email, password);
      if (!success) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Usuario o contraseña incorrectos",
          confirmButtonColor: "#d33",
        });

        return;
      }

      if (isTwoFactor) {
        // Redirect to 2FA page
        navigate(`/verify-2fa?tempToken=${encodeURIComponent(tempToken)}`);
      } else {
        login(rol, id);
        // Normal login success — redirect to dashboard or home
        navigate("/Dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor, intentá nuevamente más tarde.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleSendReset = async () => {
    if (!emailReset.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingresa un correo electrónico.",
      });
      handleClose();
      return;
    }

    try {
      const response = await RequestPasswordReset(emailReset);
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Correo enviado",
          text: "Se envió un enlace de recuperación a tu correo.",
        });
        handleClose();
      } else {
        handleClose();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo enviar el enlace. Verifica el correo.",
        });
      }
      setEmailReset("");
    } catch (error) {
      console.error("Error enviando reset:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Hubo un error al intentar enviar el enlace.",
      });
    }
  };

  return (
    <div>
      {/* <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} */}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #f0fdfa 100%)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Large circle top right */}
          <Box
            sx={{
              position: "absolute",
              top: "-96px",
              right: "-96px",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background: "rgba(52, 211, 153, 0.25)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Medium circle bottom left */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-128px",
              left: "-128px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "rgba(20, 184, 166, 0.2)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Small accent circle top left */}
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              left: "25%",
              width: "192px",
              height: "192px",
              borderRadius: "50%",
              background: "rgba(110, 231, 183, 0.1)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Small accent circle bottom right */}
          <Box
            sx={{
              position: "absolute",
              bottom: "33%",
              right: "33%",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "rgba(94, 234, 212, 0.1)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
            <Paper
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(209, 250, 229, 0.5)",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    position: "absolute",
                    top: -8,
                    left: -8,
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "rgba(45, 161, 76, 0.08)",
                    },
                  }}
                  aria-label="regresar"
                >
                  <ArrowBack />
                </IconButton>
              </Box>

              <Box textAlign="center" mb={2}>
                <img src="/src/assets/Logo.png" alt="Logo" style={{ maxWidth: "120px" }} />
              </Box>

              <Box textAlign="center" mb={5}>
                <Typography variant="h4" fontWeight={600} color="primary">
                  Iniciar Sesión
                </Typography>
              </Box>

              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Correo Eletronico"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Contraseña"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  variant="body2"
                  color="primary"
                  align="right"
                  sx={{ mb: 2, cursor: "pointer", textDecoration: "underline" }}
                  onClick={handleOpen}
                >
                  ¿Olvidaste tu contraseña?
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
                >
                  Iniciar sesión
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ mb: 2, py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate("/registro")}
                >
                  Crear cuenta
                </Button>
              </form>
            </Paper>
          </Container>
        </Box>

        {/* Modal de recuperación */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          sx={{
            "& .MuiDialog-paper": { minHeight: "200px", minWidth: "300px" },
          }}
        >
          <DialogTitle>Recuperar contraseña</DialogTitle>
          <DialogContent>
            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              value={emailReset}
              onChange={(e) => setEmailReset(e.target.value)}
              sx={{ mt: 4 }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleSendReset} variant="contained" color="primary">
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  )
}

