import React, { useState, useEffect } from 'react'
import { getDashboardGroup } from '../API/DashboardGroup';
import { Box, Card, Grid, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export const DashboardsCards = () => {

  const [data, setData] = useState(null);
  const grupo = 1; //obtener el id del grupo cuando se implemente...

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardGroup(grupo);
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) {
    return <CircularProgress></CircularProgress>
  }

  const { GroupName, Projects, Consumptions, HasProjects, HasConsumption } = data;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* info general grupo */}
        <Grid width="100%">
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent className='card-content-dg'>
              <Typography variant="h5" gutterBottom>Grupo: {GroupName}</Typography>
              <Typography variant="body2" color="text.secondary">
                Resumen general del grupo
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Proyectos & reportes */}
        <Grid size={6}>
          <Grid container spacing={4} >

            <Grid size={12}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent className='card-content-dg'>
                  <Typography variant="h6" gutterBottom>Proyectos del grupo</Typography>
                  {HasProjects ? (
                    <Carousel>
                      {Projects.map((project) => (
                        <Carousel.Item key={project.ID}>
                          <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle1">{project.Name}</Typography>
                            <Typography variant="body2">{project.Description}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(project.FechaInicio).toLocaleDateString()} - {new Date(project.FechaFinal).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : <Typography variant="body2" color="text.secondary">
                    No hay proyectos en curso.
                  </Typography>}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={12}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent className='card-content-dg'>
                  <Typography variant="h6" gutterBottom>Reportes</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Accede a los reportes de la empresa
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Ver reportes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* consumo */}
        <Grid size={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent className='card-content-dg' sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}> {/*Consumo */}
              <Typography variant="h6" gutterBottom>Resumen de consumo</Typography>
              {HasConsumption ? (
                <Box component="ul" sx={{ pl: 3 }}>
                  {Consumptions.map((c) => (
                    <li key={c.ID}>
                      <Typography variant="body2">
                        <strong>Factor: </strong>{c.Factor} | <strong>Unidad: </strong>{c.Unidad}
                      </Typography>
                    </li>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay consumos registrados...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )

}
