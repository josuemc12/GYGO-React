import React, { useState, useEffect } from "react";
import ProjectTable from "../components/ProjectTable";
import {
  getProjects,
  getProjectsbyStatus,
  getProjectsByDates,
} from "../API/Projects";
import {getTasks} from "../API/Tasks"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
 
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "../styles/ProjectsPage.css";
import { Try } from "@mui/icons-material";

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

  // Abrir modal y cargar detalles
  const VerMas = async (projectID) => {
    setOpenModal(true);
    console.log(projectID);
    setLoading(true);
    try{
      const tasks = await getTasks(projectID);
      console.log(tasks);
      setTasks(tasks);
    }catch (error){
      setTasks(null);
      console.log("El siguiente proyecto no tiene Tareas");
    }finally{
      setLoading(false);
    }
  };

  const CloseModal = () => {
    setOpenModal(false);
    setTasks(null);
  };

  //Constante para encontrar proyectos
  const grupo = 1;
  const fetchProjects = async () => {
    try {
      let data = [];
      if (startDate && endDate) {
        const formattedStart = dayjs(startDate).format("YYYY-MM-DD");
        const formattedEnd = dayjs(endDate).format("YYYY-MM-DD");
        data = await getProjectsByDates(formattedStart, formattedEnd, grupo);
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
  };

  return (
    <div id="container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 2 }}>
          <div style={{ display: "flex" }}>
            <h3>Proyectos</h3>
          </div>
        </Box>

        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              mx: "auto",
              maxWidth: "100%",
              mb: 2,
              border: "1px solid #ccc",
              borderRadius: 2, // bordes redondeados (usa unidades MUI)
              padding: 2,
            }}
          >
            <FormControl sx={{ minWidth: 100, mb: 1 }}>
              <InputLabel>Estado</InputLabel>
              <Select
                size="small"
                value={filter}
                label="Estado"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="true">Realizados</MenuItem>
                <MenuItem value="false">Pendientes</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label="Fecha Inicio"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: "small", sx: { width: 160 } } }}
            />
            <DatePicker
              label="Fecha Fin"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: "small", sx: { width: 160 } } }}
            />
            <Button variant="contained" onClick={SearchByDate}>
              Buscar por fecha
            </Button>
            <Button variant="contained" onClick={CleanDates}>
              Limpiar Fechas
            </Button>
          </Stack>

          <ProjectTable projects={projects} onViewMore={VerMas} />
        </Box>
      </LocalizationProvider>



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
              Estado: {task.status ? "Completada" : "Pendiente"}
            </Typography>
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
