import React, { useState, useEffect } from 'react'
import { getDashboardGroup } from '../API/DashboardGroup';
import { Card, Grid, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export const DashboardsCards = () => {

    const [data, setData] = useState(null);
    const grupo = 1; //obtener el id del grupo cuando se implemente...
    
    useEffect(() => {
      const fetchData = async() =>{
        const result = await getDashboardGroup(grupo);
        setData(result);
      };
    fetchData();
    }, []);
    
    if(!data){
        return <CircularProgress></CircularProgress>
    }

    const { GroupName, Projects, Consumptions, HasProjects, HasConsumption } = data;

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant='h5'>Grupo: {GroupName}</Typography>
                        <Typography variant='body2'>Resumen general del grupo</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    {HasProjects && (
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>Proyectos del grupo</Typography>
                                    <Carousel>
                                        {Projects.map((project) => (
                                            <Carousel.Item key={project.ID}>
                                                <div className='p-3'>
                                                    <Typography variant='subtitle1'>{project.Name}</Typography>
                                                    <Typography variant='body2'>{project.Description}</Typography>
                                                    <Typography variant='caption'>
                                                        {new Date(project.FechaInicio).toLocaleDateString()} - {new Date(project.FechaFinal).toLocaleDateString()}
                                                    </Typography>
                                                </div>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6'>Reportes</Typography>
                                <Typography variant='body2'>Accede a los reportes de la empresa</Typography>
                                <Button variant='contained' color='primary' className='mt-2'>
                                    Ver reportes
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Card style={{height: '100%'}}>
                    <CardContent>
                        <Typography variant='h6'>Resumen de consumo</Typography>
                        {HasConsumption ? (
                            <ul>
                                {Consumptions.map((c) => (
                                    <li key={c.ID}>
                                        <strong>Factor: </strong>{c.Factor} | <strong>Unidad: </strong>{c.Unidad}
                                    </li>
                                ))}
                            </ul>
                        ): (<Typography variant='body2'>No hay consumo registrados...</Typography>)}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
