import React from 'react';
import "../styles/DashboardGPage.css";
import { DashboardsCards } from '../components/DashboardsCards';
import { Typography } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';


export const DashboardGroupPage = () => {
    return (
        <>
            <div className='container mt-5'>
                <Typography variant='h4' sx={{fontWeight: 'medium', color: 'primary.main', mb: 2}}>
                    🌿 ¡Hola, ~User~! Bienvenido de nuevo. 
                </Typography>
                <DashboardsCards />
            </div>
        </>
    )
}
