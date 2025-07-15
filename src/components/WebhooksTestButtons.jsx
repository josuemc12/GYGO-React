import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "@/components/MDBox";
import MDButton from "@/components/MDButton";
import MDTypography from "@/components/MDTypography";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { appsettings } from "../settings/appsettings";

export default function WebhookTestButtons({ paypalSubscriptionId }) {
  const triggerWebhook = async (eventType, paypalSubscriptionId) => {
    try {
      const response = await fetch(
        `${appsettings.apiUrl}Webhooks/trigger?eventType=${eventType}&paypalSubscriptionId=${paypalSubscriptionId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Webhook failed");

      const result = await response.json();
      alert(`Webhook "${eventType}" triggered successfully.`);
    } catch (error) {
      console.error(error);
      alert(`Error triggering webhook: ${error.message}`);
    }
  };

  return (
      <MDBox pt={6} pb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3} textAlign="center">
                <MDTypography variant="h4" fontWeight="medium" gutterBottom>
                  Simular Webhooks de PayPal
                </MDTypography>

                <MDBox mt={3}>
                  <MDButton
                    variant="gradient"
                    color="error"
                    onClick={() => triggerWebhook("BILLING.SUBSCRIPTION.CANCELLED", paypalSubscriptionId)}
                    sx={{ m: 1 }}
                    disabled={!paypalSubscriptionId}
                  >
                    Simular CANCELACIÓN
                  </MDButton>

                  <MDButton
                    variant="gradient"
                    color="warning"
                    onClick={() => triggerWebhook("BILLING.SUBSCRIPTION.SUSPENDED", paypalSubscriptionId)}
                    sx={{ m: 1 }}
                    disabled={!paypalSubscriptionId}
                  >
                    Simular SUSPENSIÓN
                  </MDButton>

                  <MDButton
                    variant="gradient"
                    color="success"
                    onClick={() => triggerWebhook("PAYMENT.SALE.COMPLETED", paypalSubscriptionId)}
                    sx={{ m: 1 }}
                    disabled={!paypalSubscriptionId}
                  >
                    Simular PAGO COMPLETADO
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
  );
}