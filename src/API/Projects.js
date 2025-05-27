import {appsettings} from '../settings/appsettings'

//API para llamar los proyectos por grupo
export async function getProjects(grupo) {
    const response = await fetch(`${appsettings.apiUrl}Projects/AllProjects/${grupo}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }  
}

//API para los projectos pendientes
export async function getProjectsbyStatus(status,grupo){
    const response = await fetch(`${appsettings.apiUrl}Projects/status/${status}?group=${grupo}`);
    if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error al obtener proyectos por estado');
  }
}