import { appsettings } from "../settings/appsettings";






//API para llamar los proyectos por grupo
export async function getUsers() {
  const response = await fetch(`${appsettings.apiUrl}ManagmentUsers/AllUsers`, {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

//API para los projectos pendientes
export async function getUsersbyRol(rol) {
  const response = await fetch(
    `${appsettings.apiUrl}ManagmentUsers/rol/${rol}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
  CreatePdf;
}

