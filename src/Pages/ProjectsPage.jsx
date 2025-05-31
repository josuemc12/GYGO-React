import React, { useState, useEffect } from "react";
import ProjectTable from "../components/ProjectTable";
import { jsPDF } from "jspdf";
import {
  getProjects,
  getProjectsbyStatus,
  getProjectsByDates,
} from "../API/Projects";
import { getTasks, UpdateStatusTask } from "../API/Tasks";
import {
  Grid,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Modal,
  Switch,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "../styles/ProjectsPage.css";
import { Try } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Swal from "sweetalert2";

export function ProjectsPage() {
  //Hook para manejar el JSON de proyectos
  const [projects, setProjects] = useState([]);
  //Hook para manejar el JSON de proyectos filtro
  const [filter, setFilter] = useState("todos");
  //Hook para manejar el JSON de proyectos por fechas
  const [startDate, setStartDate] = useState(null);
  //Hook para manejar el JSON de proyectos por fechas
  const [endDate, setEndDate] = useState(null);
  //Hook para manejar el JSON de las tareas por proyectos
  const [tasks, setTasks] = useState(null);
  //Hook para cuando abrir el modal
  const [openModal, setOpenModal] = useState(false);
  //Hook para cuando un loading
  const [loading, setLoading] = useState(false);

  const [taskStatus, setTaskStatus] = useState({});


  const [data, setData] = useState([]);

  //Constante para encontrar proyectos
  const grupo = 1;
  const fetchProjects = async () => {
    try {
      let data = [];
      if (startDate && endDate) {
        const formattedStart = encodeURIComponent(dayjs(startDate).format("MM/DD/YYYY"));
        const formattedEnd = encodeURIComponent(dayjs(endDate).format("MM/DD/YYYY"));
        data = await getProjectsByDates(formattedStart, formattedEnd, grupo);
        setData(data);
      } else if (filter === "todos") {
        data = await getProjects(grupo);
      } else {
        const status = filter === "true" ? true : false;
        data = await getProjectsbyStatus(status, grupo);
      }
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!startDate && !endDate) {
      fetchProjects();
    }
  }, [filter]);

  const SearchByDate = () => {
    if (startDate && endDate) {
      fetchProjects();
    }
  };

  const CleanDates = () => {
    setFilter("todos");
    fetchProjects();
    setEndDate(null);
    setStartDate(null);
    setData(0);
  };

  // Abrir modal y cargar detalles
  const VerMas = async (projectID) => {
    setOpenModal(true);
    console.log(projectID);
    setLoading(true);
    try {
      const tasks = await getTasks(projectID);
      console.log(tasks);
      const initialStatus = {};
      tasks.forEach((task) => {
        initialStatus[task.taskId] = task.estado; // suponiendo que `estado` es booleano
      });
      setTaskStatus(initialStatus);
      setTasks(tasks);
    } catch (error) {
      setTasks(null);
      console.log("El siguiente proyecto no tiene Tareas");
    } finally {
      setLoading(false);
    }
  };

  const CloseModal = () => {
    setOpenModal(false);
    setTasks(null);
  };

  const UpdateStatusTasks = (taskId) => (event) => {
    const newStatus = event.target.checked;
    setTaskStatus((prev) => ({
      ...prev,
      [taskId]: newStatus,
    }));

    UpdateStatusTask(taskId, newStatus)
      .then(() => {
        console.log("Estado actualizado");
      })
      .catch((err) => {
        console.error("Error al actualizar estado", err);
      });
  };

  const CreatePdf = () => {
    const doc = new jsPDF();

    doc.text("¡Hola mundo!", 10, 10);
    doc.save("a4.pdf");
  };

  return (
    <div id="container">
      <main style={{ padding: "24px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <Stack
              spacing={3}
              sx={{
                mb: 2,
                border: "1px solid #ccc",
                borderRadius: 2, // bordes redondeados (usa unidades MUI)
                padding: 2,
              }}
            >
              <div>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Box display="flex" flexDirection="column">
                      <Box display="flex" alignItems="center" gap={1}>
                        <FilterAltOutlinedIcon fontSize="medium" />
                        <Typography variant="h6">Filtros y Acciones</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Filtra los proyectos por status y fechas
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Nuevo Proyecto</Button>
                  </Grid>
                </Grid>

                <div style={{ paddingTop: "3%" }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    {/* BLOQUE IZQUIERDO: Filtros */}
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Box>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="left"
                            >
                              Status
                            </Typography>
                            <FormControl size="small" sx={{ width: 180 }}>
                              <Select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                              >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="true">Realizados</MenuItem>
                                <MenuItem value="false">Pendientes</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>

                        <Grid item>
                          <Box>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="left"
                            >
                              Fecha Inicio
                            </Typography>
                            <DatePicker
                              value={startDate}
                              onChange={(newValue) => setStartDate(newValue)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: { width: 180 },
                                },
                              }}
                            />
                          </Box>
                        </Grid>

                        <Grid item>
                          <Box>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="left"
                            >
                              Fecha Fin
                            </Typography>
                            <DatePicker
                              value={endDate}
                              onChange={(newValue) => setEndDate(newValue)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: { width: 180 },
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Box display="flex" gap={1}>
                        <Button variant="contained" onClick={SearchByDate}>
                          Buscar por fecha
                        </Button>
                        <Button variant="contained" onClick={CleanDates}>
                          Limpiar Fechas
                        </Button>
                        {data.length > 0 &&(
                        
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => alert("Botón adicional")}
                              
                            >
                              Descargar pdf
                            </Button>
                   
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Stack>

            <ProjectTable
              projects={projects}
              onViewMore={VerMas}
              createPdf={CreatePdf}
            />
          </Box>
        </LocalizationProvider>
      </main>

      <Modal
        open={openModal}
        onClose={CloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Cargando detalles...</Typography>
            </Box>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Typography variant="h6" gutterBottom>
                Detalles del Proyecto: {tasks[0].proyect}
              </Typography>

              {tasks.map((task) => (
                <Box
                  key={task.taskId}
                  sx={{
                    mb: 2,
                    p: 1,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Tarea: {task.titulo}
                  </Typography>
                  <Typography>Descripción: {task.descripcion}</Typography>
                  <Typography>
                    Estado:{" "}
                    {taskStatus[task.taskId] ? "Completada" : "Pendiente"}
                  </Typography>
                  <Switch
                    checked={!!taskStatus[task.taskId]}
                    onChange={UpdateStatusTasks(task.taskId)}
                    color="primary"
                    inputProps={{ "aria-label": "cambiar estado tarea" }}
                  />
                </Box>
              ))}

              <Button onClick={CloseModal} sx={{ mt: 2 }} variant="contained">
                Cerrar
              </Button>
            </>
          ) : (
            <Typography>No hay tareas para mostrar</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
