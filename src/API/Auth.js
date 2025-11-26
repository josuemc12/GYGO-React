import { appsettings } from "../settings/appsettings";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export async function verify2FACode(tempToken, code) {
  try {
    const response = await fetchWithAuth(
      `${appsettings.apiUrl}Auth/verify-2FA`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tempToken, code }),
      }
    );

    if (!response) return;

    const data = await response.json();

    if (response.ok) {
      return { success: true, rol: data.rol };
    } else {
      return { success: false, error: data.error };
    }
  } catch (err) {
    return { success: false, error: "Request failed." };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetchWithAuth(`${appsettings.apiUrl}Auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.isSuccess) {
      if (response.status === 401) {
        return { success: false, error: data.errors };
      }
    }

    if (data.message === "2FA required") {
      return {
        success: true,
        isTwoFactor: true,
        tempToken: data.tempToken,
        rol: data.rol,
        id: data.id,
      };
    }

    return { success: true, isTwoFactor: false, rol: data.rol, id: data.id };
  } catch (err) {
    console.error("Detalles del error:", errorData, "Código:", response.status);
    return {
      success: false,
      error: "Error del servidor. Por favor, inténtelo de nuevo más tarde.",
    };
  }
}

//Probar
export async function sendInvite(email) {
  try {
    const response = await fetchWithAuth(
      `${appsettings.apiUrl}Admin/sendInvite`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(email),
      }
    );
    if (!response) return;

    if (response.ok) {
      return { success: true };
    }

    const data = await response.json();
    return { success: false, error: data };
  } catch (error) {
    return { success: false, error: "Error en la solicitud." };
  }
}

export async function registerUser(inviteToken, { email, username, password }) {
  const url = inviteToken ? `User/register/${inviteToken}` : "User/Register";

  try {
    const response = await fetchWithAuth(`${appsettings.apiUrl}${url}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    if (!response) return;

    const data = await response.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    return { success: true, message: data.message };

    return { success: false, error: data.error || "Registro fallido" };
  } catch {
    return { success: false, error: "Error al comunicarse con el servidor" };
  }
}

async function fetchGroupId() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    console.error("Token not found in cookies");
    return;
  }

  try {
    const response = await fetchWithAuth(
      `${appsettings.apiUrl}/getGroupId?adminToken=${encodeURIComponent(token)}`
    );
    const groupId = await response.json();

    return groupId;
  } catch (error) {
    console.error("Error fetching group ID:", error);
  }
}

export async function getCurrentUser() {
  const response = await fetchWithAuth(
    `${appsettings.apiUrl}User/UserProfile`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response) return;

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function logoutSesion() {
  const response = await fetch(`${appsettings.apiUrl}Auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

export async function refreshLogin() {
  try {
    const response = await fetchWithAuth(
      `${appsettings.apiUrl}Auth/refresh-login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to refresh login:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error calling refresh-login:", error);
    return null;
  }
}

export async function checkUserSession() {
  try {
    const response = await fetch(
      `${appsettings.apiUrl}auth/is-user-logged-in`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // console.error("Failed to validate session:", data);
      return null;
    }

    return data;
  } catch (error) {
    // console.error("Error llamando al isLoggedIn", error);
    return null;
  }
}
