import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { verify2FACode } from "../API/Auth";
import { useAuth } from "../context/AuthContext"
import { Box, Container, Paper, Typography, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

export function Verify2FA() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tempToken = searchParams.get("tempToken");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { success, rol, error } = await verify2FACode(tempToken, code);

      if (success) {
        login(rol);
        Swal.fire({
          icon: "success",
          title: "¡Código verificado!",
          text: "Has ingresado correctamente.",
          confirmButtonColor: "#2DA14C",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1600); // pequeño margen por si tarda en cerrarse el Swal
      } else {
        Swal.fire({
          icon: "error",
          title: "Código incorrecto",
          text: "El código ingresado no es válido. Inténtalo nuevamente.",
          confirmButtonColor: "#d33",
        });
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 520,
          height: 320,
          p: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Autenticación en dos pasos
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Introduzca el código enviado a su correo.
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Código de verificación"
            variant="outlined"
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          <Button
  type="submit"
  variant="contained"
  fullWidth
  size="large"
  sx={{
    mt: 2,
    backgroundColor: "#2DA14C", // verde
    color: "#fff",               // letras blancas
    "&:hover": {
      backgroundColor: "#1fcc4bff", // verde más oscuro al hacer hover
    },
  }}
>
  Verificar
</Button>
        </form>
      </Paper>
    </Box>
  );
};
