import React, { useState } from "react";
import DataTable from "datatables.net-react";
import DT from 'datatables.net-dt';
DataTable.use(DT);



export default function ProjectTable({ projects }) {
   const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",

    }
};

  return (
    <>
      <div>
        <DataTable className="display" options={dataTableOptions}> 
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
            </tr>
           
          </thead>

        </DataTable>
      </div>
    </>
    
  );
  
}
