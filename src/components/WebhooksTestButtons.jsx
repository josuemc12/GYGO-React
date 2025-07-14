import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "@/components/MDBox";
import MDButton from "@/components/MDButton";
import MDTypography from "@/components/MDTypography";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";

export default function WebhookTestButtons() {
  const triggerWebhook = async (type) => {
    try {
      const response = await fetch(
        `https://localhost:7217/api/Subscription/test-webhook?type=${type}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Webhook failed");

      const result = await response.json();
      alert(`Webhook "${type}" triggered successfully.`);
    } catch (error) {
      console.error(error);
      alert(`Error triggering webhook: ${error.message}`);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                    onClick={() => triggerWebhook("BILLING.SUBSCRIPTION.CANCELLED")}
                    sx={{ m: 1 }}
                  >
                    Simular CANCELACIÓN
                  </MDButton>

                  <MDButton
                    variant="gradient"
                    color="warning"
                    onClick={() => triggerWebhook("BILLING.SUBSCRIPTION.SUSPENDED")}
                    sx={{ m: 1 }}
                  >
                    Simular SUSPENSIÓN
                  </MDButton>

                  <MDButton
                    variant="gradient"
                    color="success"
                    onClick={() => triggerWebhook("PAYMENT.SALE.COMPLETED")}
                    sx={{ m: 1 }}
                  >
                    Simular PAGO COMPLETADO
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}