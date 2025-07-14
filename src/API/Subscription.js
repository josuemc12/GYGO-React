import { appsettings } from "../settings/appsettings";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function getAllPlans() {
  try {
    const response = await fetch(`${appsettings.apiUrl}Subscription/plans`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const plans = await response.json();
    return plans;
  } catch (error) {
    console.error("getAllPlans error:", error);
    throw error;
  }
}

export async function subscribeToPlan(planId) {
  try {
    const response = await fetch(`${appsettings.apiUrl}Subscription/subscribe`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    // Retorna la respuesta JSON, que debería incluir approvalUrl
    return await response.json();
  } catch (error) {
    console.error("subscribeToPlan error:", error);
    throw error;
  }
}

export async function cancelSubscription(){

}

export async function CacelSubscriptionByAdmin(){

}

export async function getSubscription(planId) {
  try {
    const response = await fetch(`${appsettings.apiUrl}Subscription/info?planId=${planId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getSubscription error:", error);
    throw error;
  }
}

export async function getSubscriptionByUserId() {
  try {
    const response = await fetch(`${appsettings.apiUrl}Subscription/subscription-info`, {
      method: "GET",
      credentials: "include", // para enviar cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getSubscriptionByUserId error:", error);
    throw error;
  }
}