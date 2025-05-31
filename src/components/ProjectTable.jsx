import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Modal,
  Box,
  Stack,
  Tooltip,
  Menu, MenuItem,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProjectTable({ projects, onViewMore, createPdf }) {
  const [open, setOpen] = useState(false);

  // Define columnas, ajusta los campos según tus datos reales
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 300, resizable: false },
    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 300,
      resizable: false,
    },
    {
      field: "unidadNombre",
      headerName: "Unidad Reduccion",
      width: 150,
      resizable: false,
    },
    {
      field: "cantidadReduccion",
      headerName: "cantidad Reduccion",
      width: 150,
      resizable: false,
    },
    {
      field: "fechaInicio",
      headerName: "Fecha Inicio",
      width: 120,
      resizable: false,
    },
    {
      field: "fechaFinal",
      headerName: "Fecha Final",
      width: 120,
      resizable: false,
    },
    {
      field: "estatus",
      headerName: "Estado",
      width: 90,
      resizable: false,
      valueFormatter: (value) => (value ? "Realizado" : "Pendiente"),
    },
    {
      field: "acciones",
headerName: "Acciones",
width: 150,
sortable: false,
filterable: false,
renderCell: (params) => (
  <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
    <Tooltip title="Ver detalles">
      <IconButton onClick={() => onViewMore(params.row.proyectoId)}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Editar">
      <IconButton>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar">
      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </div>
),
    },
  ];

  return (
    <div style={{ height: 410, width: "100%", textAlign: "left" }}>
      <Stack
        spacing={3}
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2, // bordes redondeados (usa unidades MUI)
          padding: 2,
        }}
      >
        <h4 style={{ fontWeight: "bold" }}>Lista de Proyectos</h4>

        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          disableSelectionOnClick // Esto evita que se seleccione la fila al hacer clic
          checkboxSelection={false}
          isRowSelectable={() => false}
          showToolbar
          getRowId={(row) => row.proyectoId} // Aquí le dices que use proyectoId como id único
          disableColumnMenu
        />
      </Stack>
    </div>
  );
}
