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


//API para actulizar el status de los proyectos
export async function UpdateStatusTask(tasksID, status) {
  try {
    const response = await fetch(
      `${appsettings.apiUrl}Tasks/UpdateTaskStatus?TaskId=${tasksID}&status=${status}`,
      { method: 'PUT' } // Recomiendo usar PUT para actualizar, si la API lo soporta
    );
    if (response.ok) {
      return true;
    } else {
      console.error('Error al actualizar el estado:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    return false;
  }
}
