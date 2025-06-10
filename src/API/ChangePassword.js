import { appsettings } from "../settings/appsettings";

export async function PostChangePassword(UserDTO, token){
    const response = await fetch(`${appsettings.apiUrl}user/ChangePassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(UserDTO)
    });

    if (response.ok) {
        const data = await response.text();
        return data;
    } else {
        const error = await response.text();
        throw new Error(error);
    }
}