import {appsettings} from '../settings/appsettings'

export async function GetServices() {
    const response = await fetch(`${appsettings.apiUrl}Services/GetServices`

        , {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
        }
    );
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
}