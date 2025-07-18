import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { AddGroupForm } from "../components/AddGroupForm";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { useAuth } from "../context/AuthContext";

export const AddGroupSAPage = () => {
  const { refreshUserData } = useAuth();
  const handleGroupCreated = async () => {
    await refreshUserData();
  };

  return (
    <DashboardLayout>
      <div className="align-items-center justify-content-center my-3">
        <Typography variant="h3">Crear nuevo grupo</Typography>
        <hr />
        <AddGroupForm onGroupCreated={handleGroupCreated} />
      </div>
      <Footer />
    </DashboardLayout>
  );
};