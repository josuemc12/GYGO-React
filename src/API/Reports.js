import { appsettings } from "../settings/appsettings";

export async function getReportCompanies({
  status = null,
  idService = null,
} = {}) {
  const params = new URLSearchParams();

  if (status !== null) {
    params.append("status", status);
  }
  if (idService !== null) {
    params.append("idService", idService);
  }

  const url = `${appsettings.apiUrl}Reports/AllCompanies${params.toString() ? `?${params}` : ""}`;
  const response = await fetch(url, {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
    });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function GetServices() {
  const response = await fetch(`${appsettings.apiUrl}Services/GetServices`

    , {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}



export async function GetReportsGroupsByService() {
  const response = await fetch(`${appsettings.apiUrl}Reports/ServicesGroupByService`
    , {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}


export async function GetReportsGroupsDetails() {
  const response = await fetch(`${appsettings.apiUrl}Reports/GetGropusDetails`, {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
    });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}
