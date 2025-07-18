import { useState } from "react";
import MDButton from "@/components/MDButton";
import { appsettings } from "../settings/appsettings";

export default function CancelSubscriptionButton({ subscriptionId, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      console.log("subscriptionId:", subscriptionId);
      const url = new URL(`${appsettings.apiUrl}Subscription/cancel`);
      url.searchParams.append("subscriptionId", subscriptionId);
      url.searchParams.append("reason", "User requested cancellation");
      console.log("Request URL:", url.toString());

      const response = await fetch(url.toString(), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      alert("Suscripción cancelada exitosamente.");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al cancelar la suscripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDButton
      color="error"
      variant="gradient"
      onClick={handleCancel}
      disabled={loading}
    >
      {loading ? "Cancelando..." : "Cancelar Suscripción"}
    </MDButton>
  );
}