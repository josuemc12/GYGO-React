import React from "react";
import {DataGrid} from "@mui/x-data-grid";

export default function ProjectTable({ projects }) {

  const handleVerMas = (row) => {
  console.log("Proyecto seleccionado:", row);
  // Puedes navegar, abrir un modal, etc.
};

  // Define columnas, ajusta los campos según tus datos reales
  const columns = [
    { field: "proyectoId", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "descripcion", headerName: "Descripción", width: 300 },
    {
      field: "estatus",
      headerName: "Estado",
      width: 130,
        resizable: false,
      // Opcional: mostrar 'Activo' o 'Inactivo' según booleano
      valueFormatter: (params) => (params.value ? "Activo" : "Inactivo"),
    },
    {
    field: 'acciones',
    headerName: 'Acciones',
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <button onClick={() => handleVerMas(params.row)}>Ver más</button>
    ),
  },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
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
    </div>
  );
}

