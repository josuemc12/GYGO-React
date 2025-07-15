import { useState } from "react";
import MDButton from "@/components/MDButton";
import { appsettings } from "../settings/appsettings";

export default function CancelSubscriptionButton({ userId, planId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const url = new URL(`${appsettings.apiUrl}Subscription/cancel`);
      url.searchParams.append("userId", userId);
      url.searchParams.append("planId", planId);
      url.searchParams.append("reason", "User requested cancellation");

      const response = await fetch(url.toString(), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("No se pudo cancelar la suscripción.");

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