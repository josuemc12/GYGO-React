import { appsettings } from "../settings/appsettings";

export const getUnits = async () => {
  try {
    const response = await fetch(`${appsettings.apiUrl}Unit/GetUnits`, {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Failed to load categories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const CreateUnits = async(unitDTO) => {
  const response = await fetch(`${appsettings.apiUrl}Unit/CreateUnit`,{
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unitDTO)
  });

  if(response.ok){
    const data = await response.text();
    return data;
  }else{
    const error = await response.text();
    return error;
  }
}

export async function UpdateUnits(unitDTO){
  const response = await fetch(`${appsettings.apiUrl}Unit/Update`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(unitDTO)
        });
    
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const error = await response.text();
            throw new Error(error);
        }
}