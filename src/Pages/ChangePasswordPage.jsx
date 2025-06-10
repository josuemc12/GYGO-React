import React, { useEffect, useState } from 'react'
import { ChangePasswordForm } from '../components/ChangePasswordForm'
import { jwtDecode } from 'jwt-decode';
import { Box, Typography } from '@mui/material';


export const ChangePasswordPage = () => {

  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decode = jwtDecode(token);
      setUsername(decode.usuario)
    }
  }, [])

  return (
    <div className='justify-content-center align-items-center my-4'>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' >Cambiar contraseña | {username}  </Typography>
      </Box>
      <hr />
      <ChangePasswordForm></ChangePasswordForm>
    </div>
  )
}
