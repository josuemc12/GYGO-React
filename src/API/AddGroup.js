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

export async function reactivateGroup(groupId){
  const res = await fetch(`${appsettings.apiUrl}Group/reactivate/${groupId}`, {
    method: "PUT",
    credentials: "include"
  });

  const data = await res.json();

  if (res.ok) {
    return {success: true, data};
  } else {
    return {success: false}
  }
};


export async function DoesUserHaveGroup(){
  try{
    const res = await fetch(`${appsettings.apiUrl}Group/DoesUserHaveGroup`, {
      method: "GET",
      credentials: "include"
    });

    if(!res.ok) return { success:false };

    const data = await res.json();
    return { success:true, data };

  }catch(err){
    return { success:false, error:err };
  }
}

