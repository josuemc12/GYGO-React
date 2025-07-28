import { appsettings } from "../settings/appsettings";

export async function getDashboardGroup(){
    const response = await fetch(`${appsettings.apiUrl}DashboardGroup`,
        {
      method: "GET",
      credentials: "include",
    }
    ); //7217 puerto
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return [];
    }
}

export async function getSuperAdminDashboard() {
    const response = await fetch(`${appsettings.apiUrl}SuperAdmin/Dashboard`,
        {
      method: "GET",
      credentials: "include",
    }
    ); //7217 puerto
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return [];
    }
}