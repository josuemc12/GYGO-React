import { appsettings } from "../settings/appsettings";


export async function PostAddGroup(newGroup, correogrupo, selectedService,image) {
  try {

    
    const formData = new FormData();
    formData.append("nombre", newGroup);
    formData.append("correo", correogrupo);
    formData.append("idService", selectedService);
    formData.append("Logo", image);



    const response = await fetch(`${appsettings.apiUrl}Group/create`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

  if (response.ok) {
        return { success: true };
    }
      const data = await response.json();
       
       return { success: false, error: data };
  } catch (error) {
    return { success: false, error: error.message };
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
