import { appsettings } from "../settings/appsettings";

export async function getGrupoProfile(){
    const response = await fetch(`${appsettings.apiUrl}Group/getById`,
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