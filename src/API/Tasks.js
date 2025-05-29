import {appsettings} from '../settings/appsettings'

//API para llamar los proyectos por grupo
export async function getTasks(projectID) {
    const response = await fetch(`${appsettings.apiUrl}Tasks/TasksByProject/${projectID}`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
}