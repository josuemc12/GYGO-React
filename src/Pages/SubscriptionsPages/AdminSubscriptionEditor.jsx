import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";

import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";

import { getSubscription } from "../../API/Subscription";

export default function AdminSubscriptionEditor() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cambia aquí por el planId real o pasa como prop
  const planId = "tu-plan-id";

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await getSubscription(planId);
        setSubscription(data);
      } catch (err) {
        setError(err.message || "Error al cargar la suscripción");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [planId]);

  if (loading)
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Box
          sx={{ display: "flex", justifyContent: "center", mt: 5 }}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Typography color="error" align="center" mt={5}>
          {error}
        </Typography>
      </DashboardLayout>
    );

  if (!subscription)
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Typography align="center" mt={5}>
          No hay datos de suscripción.
        </Typography>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center" mt={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Información de la Suscripción
              </Typography>

              <Typography>
                <strong>Plan ID:</strong> {subscription.planId}
              </Typography>
              <Typography>
                <strong>Estado:</strong> {subscription.status}
              </Typography>
              <Typography>
                <strong>Fecha de inicio:</strong>{" "}
                {new Date(subscription.startDate).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Próxima facturación:</strong>{" "}
                {subscription.nextBillingDate
                  ? new Date(subscription.nextBillingDate).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography>
                <strong>Último pago:</strong>{" "}
                {subscription.lastPaymentDate
                  ? new Date(subscription.lastPaymentDate).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography>
                <strong>Cancelado en:</strong>{" "}
                {subscription.cancelledAt
                  ? new Date(subscription.cancelledAt).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography>
                <strong>Creado en:</strong>{" "}
                {new Date(subscription.createdAt).toLocaleDateString()}
              </Typography>
              {/* Aquí puedes agregar más detalles o botones para editar */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
