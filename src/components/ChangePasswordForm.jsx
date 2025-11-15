import React, { useState } from "react";
import {
  Card,
  Grid,
  CircularProgress,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { PostChangePassword } from "../API/ChangePassword";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

export const ChangePasswordForm = () => {
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
          timer: 3000,
          showConfirmButton: false,
        });
        return;
      }
      console.log(result);
    
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Cambio de contraseña exitoso",
          text: "El cambio de contraseña se cambio correctamente.",
          showConfirmButton: false,
          confirmButtonColor: "#2DA14C",
          timer: 3000,
        }).then(() => {
          window.location.href = "/dashboard";
        });
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al cambiar la contraseña",
          text: result.error.message,
          timer: 3000,
          showConfirmButton: false,
        });
        return;
      }

      //navigate("/DashboardGroupPage");
    } catch (error) {}
  };

  return (
    <>
      <MDBox
        component="form"
        onSubmit={handleSubmit}
        mt={3}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña Actual
          </InputLabel>
          <OutlinedInput
            onChange={(e) => setCurrentPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            // debo comentar esto
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword
                      ? "Ocultar la contraseña"
                      : "Mostrar la contraseña"
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
            id="outlined-adornment-password2"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword
                      ? "Ocultar la contraseña"
                      : "Mostrar la contraseña"
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

        <MDButton
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#4CAF50",
            color: "#ffff",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Actualizar Contraseña"
          )}
        </MDButton>
      </MDBox>
    </>
  );
};
