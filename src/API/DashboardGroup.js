import { appsettings } from "../settings/appsettings";

export async function getDashboardGroup(groupID){
    const response = await fetch(`${appsettings.apiUrl}DashboardGroup?id=${groupID}`); //7217 puerto
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return [];
    }
}