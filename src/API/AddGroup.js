import { appsettings } from "../settings/appsettings";

export async function PostAddGroup(newGroup) {
    const response = await fetch(`${appsettings.apiUrl}Group/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //autorizacion bearer / token
        },
        body: JSON.stringify({
            nombre: newGroup
        })
    });

    if (response.ok) {
        const data = await response.text();
        return data;
    } else {
        const error = await response.text();
        throw new Error(`Error al crear el nuevo grupo: ${error}`);
    }
}