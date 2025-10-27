import { appsettings } from "../settings/appsettings";




export async function getDeleteUsers() {
  const response = await fetch(`${appsettings.apiUrl}DeleteLogs/DeleteUsers`, {
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


export async function EmailDeleteUsers() {
  const response = await fetch(
    `${appsettings.apiUrl}DeleteLogs/LastDeleteUsers`,
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
}


export async function getCountUserDelete() {
  const response = await fetch(
    `${appsettings.apiUrl}DeleteLogs/CountDeleteUser`,
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
}
