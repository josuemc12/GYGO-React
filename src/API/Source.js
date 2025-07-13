import { appsettings } from "../settings/appsettings";

export const getSources = async () => {
  try {
    const response = await fetch(`${appsettings.apiUrl}Source/Get`, {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Failed to load sources');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};

export const CreateSource = async(sourceDTO) => {
  const response = await fetch(`${appsettings.apiUrl}Source/Create`,{
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sourceDTO)
  });

  if(response.ok){
    const data = await response.text();
    return data;
  }else{
    const error = await response.text();
    return error;
  }
}

export async function UpdateSource(sourceDTO){
  const response = await fetch(`${appsettings.apiUrl}Source/Update`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sourceDTO)
        });
    
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const error = await response.text();
            throw new Error(error);
        }
}