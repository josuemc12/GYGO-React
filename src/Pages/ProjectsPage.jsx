import React, { useState, useEffect } from "react";
import ProjectTable from "../components/ProjectTable";
import {getProjects} from "../API/Projects";


export function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const grupo = 1;

    useEffect(() => {
    getProjects(grupo)
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, [grupo]); // si cambia el grupo, se vuelve a llamar

  return (
    <div>
      
      <ProjectTable projects={projects}/>
    </div>
  );
}
