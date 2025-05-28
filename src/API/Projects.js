import {appsettings} from '../settings/appsettings'

//API para llamar los proyectos por grupo
export async function getProjects(grupo) {
    const response = await fetch(`${appsettings.apiUrl}Projects/AllProjects/${grupo}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
}

//API para los projectos pendientes
export async function getProjectsbyStatus(status,grupo){
    const response = await fetch(`${appsettings.apiUrl}Projects/status/${status}?groupID=${grupo}`);
    if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return []
    
  }
}

//API para obtener los proyectos por fechas
export async function getProjectsByDates(startDate,endDate, grupo) {
    const response = await fetch( `${appsettings.apiUrl}Projects/dates?Start_date=${startDate}&End_date=${endDate}&groupID=${grupo}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
    
}