import React, { useState, useEffect } from "react";
import ProjectTable from "../components/ProjectTable";
import {getProjects,getProjectsbyStatus} from "../API/Projects";
import {Box,FormControl,InputLabel,MenuItem,Select,Typography} from "@mui/material";



export function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("todos");
  const grupo = 1;

   useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (filter === "todos") {
          data = await getProjects(grupo);
        } else {
          const status = filter === "activos"; // true para activos, false para inactivos
          data = await getProjectsbyStatus(status,grupo);
        }
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [filter]);

 return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Mis Proyectos
      </Typography>

      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel>Estado</InputLabel>
        <Select
          value={filter}
          label="Estado"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="todos">Todos</MenuItem>
          <MenuItem value="activos">Activos</MenuItem>
          <MenuItem value="inactivos">Inactivos</MenuItem>
        </Select>
      </FormControl>

      <ProjectTable projects={projects} />
    </Box>
  );
}
