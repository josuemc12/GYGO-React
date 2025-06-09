import React from "react";
import { Typography } from '@mui/material';
import { AddGroupForm } from "../components/AddGroupForm";

export const AddGroupSAPage = ( ) => {


    return (
        <>
        <div className="align-items-center justify-content-center my-3">
            <Typography variant="h3">
                Crear nuevo grupo
            </Typography>
            <hr />
            <AddGroupForm />
        </div>
        </>
    )
}