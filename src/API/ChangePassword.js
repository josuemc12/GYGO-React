import { appsettings } from "../settings/appsettings";

export async function PostChangePassword(UserDTO) {
  try {
    const response = await fetch(`${appsettings.apiUrl}user/ChangePassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserDTO),
    });
    const data = await response.json(); 
    console.log(data);
    if (response.ok) {
      return { success: true };
    }
   

    return { success: false, error: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}




export async function RequestPasswordReset(email) {
  try {
    const response = await fetch(`${appsettings.apiUrl}user/RequestPasswordReset`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    if (response.ok) {
      return { success: true };
    }
    return { success: false};
  } catch (error) {
    return { success: false};
  }
}


export async function ResetPassword(token, newPassword,ConfirmPassword) {
  try {
    const response = await fetch(`${appsettings.apiUrl}User/ResetPassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        NewPassword: newPassword,
        confirmPassword : ConfirmPassword
      }),
    });
    const data = await response.json();
    console.log(data);
    
    if (!data.success) {
      return { success: false, message:data.message };
    }

    return { success: true,message:data.message };
  } catch (error) {
    return { success: false,message:response.message };
  }
}
