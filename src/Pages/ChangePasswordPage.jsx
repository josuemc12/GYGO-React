import React from 'react'
import { ChangePasswordForm } from '../components/ChangePasswordForm'
import {Box, Typography} from '@mui/material';


export const ChangePasswordPage = () => {
  return (
    <div className='justify-content-center align-items-center my-4'>
        <Box sx={{mb: 3}}>
            <Typography variant='h4' >Cambiar contraseña | ~username~  </Typography>
        </Box>
        <hr />
        <ChangePasswordForm></ChangePasswordForm>
    </div>
  )
}
