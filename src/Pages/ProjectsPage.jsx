import React, { useState, useEffect } from "react";
import ProjectTable from "../components/ProjectTable";
import {
  getProjects,
  getProjectsbyStatus,
  getProjectsByDates,
} from "../API/Projects";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "../styles/ProjectsPage.css";

export function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const handleSearchByDate = () => {
    if (startDate && endDate) {
      fetchProjects();
    }
  };


  const LimpiarFechas = () =>{
    setFilter("todos");
    fetchProjects();
    setEndDate(null);
    setStartDate(null);
  }

  return (
    <div id="container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 2 }}>
          <div style={{ display: "flex" }}>
            <h3>Proyectos</h3>
          </div>
        </Box>

        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={3} sx={{ mx:'auto', maxWidth: '100%' ,mb: 2 , border: '1px solid #ccc', borderRadius: 2,             // bordes redondeados (usa unidades MUI)
    padding: 2 }}>
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
            <Button variant="contained"  onClick={handleSearchByDate}>
              Buscar por fecha
            </Button>
             <Button variant="contained" onClick={LimpiarFechas}>
              Limpiar Fechas
            </Button>
          </Stack>

          <ProjectTable projects={projects} />
        </Box>
      </LocalizationProvider>
    </div>
  );
}
