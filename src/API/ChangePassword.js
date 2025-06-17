import { appsettings } from "../settings/appsettings";

export async function PostChangePassword(UserDTO){
    const response = await fetch(`${appsettings.apiUrl}user/ChangePassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //autorizacion bearer / token
        },
        body: JSON.stringify(UserDTO)
    });

    if (response.ok) {
        const data = await response.text();
        return data;
    } else {
        const error = await response.text();
        throw new Error(`Error al cambiar la contraseña: ${error}`);
    }
}