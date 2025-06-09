import { appsettings } from "../settings/appsettings";

export async function PostAddGroup(groupDTO) {
    const response = await fetch(`${appsettings.apiUrl}Group/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //autorizacion bearer / token
        },
        body: JSON.stringify(groupDTO)
    });

    if (response.ok) {
        const data = await response.text();
        return data;
    } else {
        const error = await response.text();
        throw new Error(error);
    }
}

export async function getUsers(){
    const response = await fetch(`${appsettings.apiUrl}getUsers`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return [];
    }
}
