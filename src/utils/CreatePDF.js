import { jsPDF } from "jspdf";

export async function CreatePDF(datos) {
  const proyectosMap = new Map();

  datos.forEach((item) => {
    if (!proyectosMap.has(item.proyectoId)) {
      // Creamos el proyecto con la estructura base y un array vacío de tareas
      proyectosMap.set(item.proyectoId, {
        proyectoId: item.proyectoId,
        grupoNombre: item.grupoNombre,
        logoUrl: item.logoUrl,
        projectNombre: item.projectNombre,
        projectDescripcion: item.projectDescripcion,
        projectUnidadNombre: item.projectUnidadNombre,
        projectCantidadReduccion: item.projectCantidadReduccion,
        fechaInicio: item.fechaInicio,
        fechaFinal: item.fechaFinal,
        projectEstatus: item.projectEstatus,
        tasks: [],
      });
    }
    // Agregamos la tarea al array de tareas del proyecto
    proyectosMap.get(item.proyectoId).tasks.push({
      taskNombre: item.taskNombre,
      taskDescripcion: item.taskDescripcion,
      taskEstatus: item.taskEstatus,
    });
  });

  async function getBase64FromUrl(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo cargar la imagen");
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Convertimos el Map a array
  const proyectos = Array.from(proyectosMap.values());
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); 
  const dia = String(fecha.getDate()).padStart(2, "0");
  const nombreArchivo = `Proyectos_${dia}-${mes}-${año}.pdf`;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const borderRadius = 10;

  // Portada (igual que antes)
  doc.setFillColor(56, 71, 69);
  doc.roundedRect(
    0,
    0,
    pageWidth,
    pageHeight * 0.6,
    borderRadius,
    borderRadius,
    "F"
  );

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(50);
  doc.setFont("helvetica", "bold");

  const texto = ["Informe:", "Proyectos"];
  let y = 40;
  texto.forEach((linea) => {
    const textWidth = doc.getTextWidth(linea);
    doc.text(linea, (pageWidth - textWidth) / 2, y);
    y += 20;
  });

  doc.setFontSize(18);
  doc.setTextColor(112, 90, 90);
  doc.setFont("helvetica", "normal");
  doc.text(proyectos[0].grupoNombre, 20, pageHeight * 0.65);
  doc.text(`Año ${año}`, 20, pageHeight * 0.67 + 6);
  doc.text("Preparado por:", 20, pageHeight - 40);
  doc.text("Preparado para:", pageWidth - 60, pageHeight - 40);

  doc.setFontSize(10);
  //doc.text("GET YOUR GREEN ON", 20, pageHeight - 30);
  //doc.text("Avoc Sel.", 20, pageHeight - 25);
  const logoGYGO = await getBase64FromUrl("/logoPdf.png");
  doc.addImage(logoGYGO, "PNG", 8, pageHeight - 49, 60, 60);

  // Inserta logo de la empresa en portada
  if (proyectos[0].logoUrl) {
    try {
      const logoEmpresa = await getBase64FromUrl(
        "https://localhost:7217/" + proyectos[0].logoUrl
      );
      doc.addImage(logoEmpresa, "PNG", pageWidth - 60, pageHeight - 25, 40, 15);
    } catch (error) {
      console.warn("No se pudo cargar el logo en la portada:", error);
    }
  }

  //doc.text("LOGO DE LA EMPRESA", pageWidth - 70, pageHeight - 30);

  // Ahora iteramos proyectos agrupados
  proyectos.forEach((data, index) => {
    doc.addPage();

    // Título página
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Detalle del Proyecto #${index + 1}`, 20, 20);

    doc.setDrawColor(56, 71, 69);
    doc.setLineWidth(1.5);
    doc.line(20, 25, pageWidth - 20, 25);

    let yy = 35;
    const leftMargin = 20;
    const maxHeight = pageHeight - 20;
    const lineHeight = 7;
    const labelColor = [56, 71, 69];

    function checkPageBreak(heightNeeded) {
      if (yy + heightNeeded > maxHeight) {
        doc.addPage();
        yy = 20;
      }
    }

    // Proyecto
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...labelColor);
    doc.text("Proyecto", leftMargin, yy);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    yy += 8;

    const proyectoInfo = [
      `Nombre: ${data.projectNombre || "-"}`,
      `Descripción: ${data.projectDescripcion || "-"}`,
      `Unidad de reduccion: ${data.projectUnidadNombre || "-"}`,
      `Cantidad de reducción: ${data.projectCantidadReduccion || "-"} ${data.projectUnidadNombre || ""}`,
      `Estado: ${data.projectEstatus ? "Realizado" : "Pendiente"}`,
      `Fecha de inicio: ${data.fechaInicio || "-"}`,
      `Fecha final: ${data.fechaFinal || "-"}`,
    ];

    proyectoInfo.forEach((line) => {
      checkPageBreak(lineHeight);
      doc.text(line, leftMargin, yy);
      yy += lineHeight;
    });

    yy += 8;
    checkPageBreak(10);
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yy, pageWidth - 20, yy);

    yy += 10;

    // Tareas
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...labelColor);
    doc.text("Tareas", leftMargin, yy);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    yy += 8;

    if (Array.isArray(data.tasks) && data.tasks.length > 0) {
      data.tasks.forEach((task, i) => {
        checkPageBreak(lineHeight * 4);
        doc.text(`Tarea #${i + 1}`, leftMargin, yy);
        yy += lineHeight;
        doc.text(`Nombre: ${task.taskNombre || "-"}`, leftMargin + 10, yy);
        yy += lineHeight;
        doc.text(
          `Descripción: ${task.taskDescripcion || "-"}`,
          leftMargin + 10,
          yy
        );
        yy += lineHeight;
        doc.text(
          `Estado: ${task.taskEstatus ? "Realizado" : "Pendiente"}`,
          leftMargin + 10,
          yy
        );
        yy += lineHeight + 4;
      });
    } else {
      doc.text("No hay tareas disponibles", leftMargin, yy);
    }
  });

  doc.save(nombreArchivo);
}
