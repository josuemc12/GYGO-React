import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Grid, CircularProgress,InputLabel, MenuItem, 
    FormControl, Select } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PostAddGroup } from '../API/AddGroup';

export const AddGroupForm = () => {

    const [nombreGrupo, setNombreGrupo] = useState('');
    const [Servicio, setServicio] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();




    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const groupDTO = {
            Nombre: nombreGrupo,
            ServiceId: Servicio
        }

        try {
            const result = await PostAddGroup(groupDTO);
            setLoading(false);

            await Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: result,
                confirmButtonText: 'Ok'
            });

            navigate('/DashboardGroupPage');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <Box
                component="form" onSubmit={handleSubmit}
                sx={{ mb: 2 }}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <TextField id='outlined-basic' sx={{ width: '50%' }} label="Nombre del Grupo" variant="outlined"
                            value={nombreGrupo} onChange={(e) => setNombreGrupo(e.target.value)} required
                        ></TextField>
                    </Grid>
                    <Grid size={12}>
                        <FormControl sx={{width: '50%'}}>
                            <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Servicio}
                                label="Servicio"
                                onChange={(e) => setServicio(e.target.value)}
                            >
                                <MenuItem value={1}>Bandera Azul</MenuItem>
                                <MenuItem value={2}>Huella</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Button type='submit' sx={{ width: '50%' }} variant='contained'
                            endIcon={<SendIcon />} disabled={loading}>
                            {loading ? <CircularProgress size={24} color='inherit' /> : 'Registrar'}
                        </Button>
                    </Grid>
                </Grid>


            </Box>
        </>
    )
}