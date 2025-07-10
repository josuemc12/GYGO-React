import React from "react";
import { Typography } from '@mui/material';
import { AddGroupForm } from "../components/AddGroupForm";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export const AddGroupSAPage = ( ) => {


    return (
        <>
        <DashboardLayout>
        <div className="align-items-center justify-content-center my-3">
            <Typography variant="h3">
                Crear nuevo grupo
            </Typography>
            <hr />
            <AddGroupForm />
        </div>
        <Footer></Footer>
        </DashboardLayout>
        </>
    )
}