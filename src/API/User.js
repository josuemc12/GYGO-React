import { appsettings } from "../settings/appsettings";

export const ChangeProfileUser = async(changeProfile) => {
    try {
    const response = await fetch(`${appsettings.apiUrl}user/editProfile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeProfile),
    });
    const data = await response.json(); 
    console.log(data);
    return data
  } catch (error) {
    return { success: false, error: error.message };
  }
}