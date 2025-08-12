import {appsettings} from '../settings/appsettings'



//API para llamar los proyectos por grupo
export async function AddTask(taskData) {
  try {
    console.log(taskData);
    const response = await fetch(`${appsettings.apiUrl}Tasks/AddTask`, {
      method: "POST",
      credentials: 'include', 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error al agregar proyecto: ${response.status} - ${errorText}`
      );
      return false;
    }

    const data = await response.json();
    console.log(data);
    return true;
  } catch (error) {
    console.error("AddTask error:", error);
    throw error;
  }
}

export async function UpdateTaskt(taskData) {
  try {
    console.log(taskData);
    const response = await fetch(
      `${appsettings.apiUrl}Tasks/UpdateTask`,
      {
        method: "PUT",
        credentials: 'include', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error al agregar tarea: ${response.status} - ${errorText}`
      );
      return false;
    }

    const data = await response.json();
    console.log(data);
    return true;
  } catch (error) {
    console.error("AddProject error:", error);
    throw error;
  }
}


// API para eliminar proyectos
export async function DeleteTask(taskID) {
  try {
    const response = await fetch(
      `${appsettings.apiUrl}Tasks/DeleteTask?TaskID=${taskID}`,
      {
        credentials: 'include', 
        method: 'DELETE',
      }
    );

    if (response.ok) {
      return true;
    } else {
      console.error("Error al eliminar el proyecto:", response.status);
      return false;
    }
  } catch (error) {
    console.error("DProject error:", error);
    throw error;
  }
}













//API para llamar los proyectos por grupo
export async function getTasks(projectID) {
    const response = await fetch(`${appsettings.apiUrl}Tasks/TasksByProject/${projectID}`,
      {
        credentials: 'include', 
        method: 'GET',
      });
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
      {
        credentials: 'include', 
        method: 'PUT',
      });
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
