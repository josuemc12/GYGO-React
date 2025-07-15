import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SuperAdminSubscriptionManager from "./SuperAdminSubscriptionManager";
import SubscribePrompt from "./SubscribePrompt";
import AdminSubscriptionEditor from "./AdminSubscriptionEditor";

import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";

import Modal from '@mui/material/Modal';
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDButton from "@/components/MDButton";

import { useAuth } from "../../context/AuthContext";
import { getSubscriptionByUserId } from "../../API/Subscription";
import WebhookTestButtons from "../../components/WebhooksTestButtons";

export default function SubscriptionSwitch() {
  const { role, userId } = useAuth();
  const [searchParams] = useSearchParams();
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [paypalSubscriptionId, setPaypalSubscriptionId] = useState(null);

  // Mostrar modal si viene ?status=success o ?status=cancel
  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      setModalMessage("¡Suscripción realizada con éxito!");
      setModalOpen(true);
    } else if (status === "cancel") {
      setModalMessage("Suscripción cancelada.");
      setModalOpen(true);
    }
  }, [searchParams]);

  // Validar si el usuario tiene una suscripción activa
  useEffect(() => {
    const checkSubscription = async () => {
      if (userId) {
        try {
          const subscription = await getSubscriptionByUserId();
          if (subscription && subscription.status !== "Cancelled") {
            setHasSubscription(true);
            setPaypalSubscriptionId(subscription.payPalSubscriptionId);
          } else {
            setHasSubscription(false);
            setPaypalSubscriptionId(null);
          }
        } catch (error) {
          console.warn("No subscription found or error:", error.message);
          setHasSubscription(false);
          setPaypalSubscriptionId(null);
        }
      }
    };

    checkSubscription();
  }, [role, userId]);

  const handleClose = () => setModalOpen(false);

  if (!role) return <p>Loading user role...</p>;

  const renderContent = () => {
    switch (role) {
      case "DEV":
      case "SA":
        return <SuperAdminSubscriptionManager />;
      case "DEF":
      case "GA":
        return hasSubscription ? <AdminSubscriptionEditor /> : <SubscribePrompt />;
      default:
        return <p>Access denied</p>;
    }
  };

  return (
    <>
      {renderContent()}

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-message-title"
        aria-describedby="modal-message-description"
      >
        <MDBox
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            width: { xs: 300, sm: 400 },
            textAlign: 'center',
          }}
        >
          <MDTypography
            variant="h6"
            id="modal-message-title"
            fontWeight="medium"
            gutterBottom
          >
            {modalMessage}
          </MDTypography>
          <MDButton variant="gradient" color="info" onClick={handleClose}>
            Cerrar
          </MDButton>
        </MDBox>
      </Modal>
    </>
  );
}