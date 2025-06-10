import React, { useState } from 'react'
import {
  Box, OutlinedInput, IconButton, InputAdornment, TextField,
  Typography, CircularProgress, Button, FormControl, InputLabel
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Swal from 'sweetalert2';
import { PostChangePassword } from '../API/ChangePassword';
import { getUserFromToken } from '../utils/Auth';


export const ChangePasswordForm = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  //funcion para validar que cumpla con identity y no sean iguales
  const isSamePassword = () => {
    return currentPassword === newPassword;
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    if (isSamePassword()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La nueva contraseña no puede ser la misma que la actual.',
        confirmButtonText: 'Ok'
      });
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Sesión inválida',
        text: 'No se encontró el token de autenticación. Inicia sesión de nuevo.',
      });
      setLoading(false);
      return;
    }

    const userId = getUserFromToken(token);
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Token inválido',
        text: 'No se pudo obtener el ID del usuario. Inicia sesión de nuevo.',
      });
      setLoading(false);
      return;
    }
    const UserDTO = {
      UserId: userId,
      CurrentPassword: currentPassword,
      NewPassword: newPassword
    }
    try {
      const result = await PostChangePassword(UserDTO, token);
      setLoading(false);

      await Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: result,
        confirmButtonText: 'Ok'
      });

      navigate('/DashboardGroupPage');

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonText: 'Ok'
      });
      setLoading(false)
      console.error(error)
      return;
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, mt: 5, display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 600, mx: 'auto' }}>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña Actual</InputLabel>
          <OutlinedInput
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'Ocultar la contraseña' : 'Mostrar la contraseña'
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
            label="Contraseña actual"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password2">Nueva Contraseña</InputLabel>
          <OutlinedInput
            onChange={(e) => setNewPassword(e.target.value)}
            required
            id="outlined-adornment-password2"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'Ocultar la contraseña' : 'Mostrar la contraseña'
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
          variant="contained" color="primary" disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Actualizar Contraseña'}
        </Button>
      </Box>
    </>
  )
}
