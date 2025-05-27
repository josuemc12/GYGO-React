import {appsettings} from '../settings/appsettings'

//API para llamar los proyectos por grupo
export async function getProjects(grupo) {
    const response = await fetch(`${appsettings.apiUrl}Projects/AllProjects/${grupo}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }  
}