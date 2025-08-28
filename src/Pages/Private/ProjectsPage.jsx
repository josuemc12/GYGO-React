import React, { useState, useEffect } from "react";

import { CreatePDF } from "../../utils/CreatePDF";
import { jsPDF } from "jspdf";
import {
  getProjects,
  getProjectsbyStatus,
  getProjectsByDates,
  getProjectsPDF,
  AddProject,
  UpdateProject,
  DProject,
} from "../../API/Projects";
import { getFactoresEmision } from "../../API/FactorEmision";
import {
  getTasks,
  UpdateStatusTask,
  AddTask,
  UpdateTaskt,
  DeleteTask,
} from "../../API/Tasks";
import { getReductionUnit } from "../../API/ReductionUnit";
import {
  Grid,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Modal,
  Switch,
  TextField,
  InputLabel,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Try } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Swal from "sweetalert2";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
dayjs.extend(customParseFormat);

function ProjectPage() {
  //Hook para manejar el JSON de proyectos
  const [projects, setProjects] = useState([]);
  //Hook para manejar el JSON de proyectos filtro
  const [filter, setFilter] = useState("todos");
  //Hook para manejar el JSON de proyectos por fechas
  const [startDate, setStartDate] = useState(null);
  //Hook para manejar el JSON de proyectos por fechas
  const [endDate, setEndDate] = useState(null);
  //Hook para manejar el JSON de las tareas por proyectos
  const [tasks, setTasks] = useState(null);
  //Hook para cuando abrir el modal
  const [openModal, setOpenModal] = useState(false);
  const [openModalProjects, setOpenModalProjects] = useState(false);

  //Hook para cuando un loading
  const [loading, setLoading] = useState(false);

  const [taskStatus, setTaskStatus] = useState({});

  const [data, setData] = useState({});

  //Use State para el modal de agregar o editar proyectos
  const [modoEdicion, setModoEdicion] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [reductionUnit, setReductionUnit] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [projectData, setProjecttData] = useState({
    proyectId: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFinal: "",
  });

  const [taskData, setTasktData] = useState({
    TaskId: "",
    proyectID: "",
    titulo: "",
    nombre: "",
    descripcion: "",
    valorActividad: "",
    FactorEmisionId: "",
    EmisionesCO2e: "",
  });

  const [tabIndex, setTabIndex] = useState(0);
  const [IsEditing, setIsEditing] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  //Constante para encontrar proyectos
  const grupo = 1;
  const fetchProjects = async () => {
    try {
      let data = [];
      if (startDate && endDate) {
        const formattedStart = encodeURIComponent(
          dayjs(startDate).format("MM/DD/YYYY")
        );
        const formattedEnd = encodeURIComponent(
          dayjs(endDate).format("MM/DD/YYYY")
        );
        data = await getProjectsByDates(formattedStart, formattedEnd);
        setData(data);
      } else if (filter === "todos") {
        data = await getProjects();
      } else {
        const status = filter === "true" ? true : false;
        data = await getProjectsbyStatus(status);
      }
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!startDate && !endDate) {
      fetchProjects();
    }
  }, [filter, startDate, endDate]);

  const SearchByDate = () => {
    if (startDate && endDate) {
      fetchProjects();
    }
  };

  const CleanDates = () => {
    setFilter("todos");
    setEndDate(null);
    setStartDate(null);
    setData(0);
  };

  // Abrir modal y cargar detalles
  const VerMas = async (projectID) => {
    setIsEditing(false);
    setOpenModal(true);
    setLoading(true);
    try {
      setTasktData({
        proyectID: projectID,
      });
      const tasks = await getTasks(projectID);

      const initialStatus = {};
      tasks.forEach((task) => {
        initialStatus[task.taskId] = task.status;
      });
      setTaskStatus(initialStatus);
      setTasks(tasks);

      const factores = await getFactoresEmision();
      setReductionUnit(factores);
    } catch (error) {
      setTasks(null);
      console.log("El siguiente proyecto no tiene Tareas");
    } finally {
      setLoading(false);
    }
  };

  const CloseModal = () => {
    setOpenModal(false);

    fetchProjects();
  };

  const UpdateStatusTasks = (taskId) => (event) => {
    const newStatus = event.target.checked;
    setTaskStatus((prev) => ({
      ...prev,
      [taskId]: newStatus,
    }));

    UpdateStatusTask(taskId, newStatus)
      .then(() => {})
      .catch((err) => {
        console.error("Error al actualizar estado", err);
      });
  };

  const CreatePDFAPI = async () => {
    try {
      const formattedStart = encodeURIComponent(
        dayjs(startDate).format("DD/MM/YYYY")
      );
      const formattedEnd = encodeURIComponent(
        dayjs(endDate).format("DD/MM/YYYY")
      );

      const projectsPDF = await getProjectsPDF(formattedStart, formattedEnd);

      CreatePDF(projectsPDF);
    } catch (error) {
    } finally {
    }
  };

  // Abrir modal y cargar detalles
  const openModalAddProject = async () => {
    setModoEdicion(false);
    setProjectId(null);
    setProjecttData({
      nombre: "",
      descripcion: "",
      fechaInicio: "",
      fechaFinal: "",
    });

    setOpenModalProjects(true);
  };

  const openModalUpdateProject = async (project) => {
    setModoEdicion(true);
    setProjectId(project.projectID);
    setProjecttData({
      proyectoId: project.proyectoId,
      nombre: project.nombre,
      descripcion: project.descripcion,
      fechaInicio: project.fechaInicio,
      fechaFinal: project.fechaFinal,
    });
    const ReductionUnitData = await getReductionUnit();
    setReductionUnit(ReductionUnitData);

    setOpenModalProjects(true);
  };
  const close = () => {
    setOpenModalProjects(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjecttData((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitModalEdicion = async () => {
    try {
      let result;
      setOpenModalProjects(false);
      const camposenBlanco = Object.values(projectData).some(
        (value) => value === "" || value === null || value === undefined
      );

      if (camposenBlanco) {
        Swal.fire({
          icon: "warning",
          title: "Campos vacíos",
          text: "Por favor, completá todos los campos antes de continuar.",
          confirmButtonColor: "#d33",
        });
        return;
      }

      if (modoEdicion) {
        result = await UpdateProject(projectData);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "¡Proyecto actualizado!",
            text: "El proyecto se ha actualizado correctamente.",
            confirmButtonColor: "#44af69",
          });
          fetchProjects();
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar el proyecto",
            text: "Por favor, revisá los datos e intentá nuevamente.",
            confirmButtonColor: "#d33",
          });
          fetchProjects();
        }
      } else {
        result = await AddProject(projectData);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "¡Proyecto guardado!",
            text: "El proyecto se ha guardado correctamente.",
            confirmButtonColor: "#44af69",
          });
          fetchProjects();
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo agregar el proyecto",
            text: "Por favor, revisá los datos e intentá nuevamente.",
            confirmButtonColor: "#d33",
          });
          fetchProjects();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Ocurrió un error inesperado. Intentalo más tarde.",
        confirmButtonColor: "#d33",
      });
      fetchProjects();
    }
  };

  const DeleteProject = async (projectID) => {
    let project = await DProject(projectID);
    setOpenModalProjects(false);
    if (project) {
      Swal.fire({
        icon: "success",
        title: "¡Proyecto Eliminado!",
        text: "El proyecto se ha eliminado correctamente.",
        confirmButtonColor: "#44af69",
      });
      fetchProjects();
    } else {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar el proyecto",
        text: "Por favor, revisá los datos e intentá nuevamente.",
        confirmButtonColor: "#d33",
      });
      fetchProjects();
    }
  };

  const SubmitModalTask = async () => {
    try {
      setOpenModal(false);

      if (
        !taskData?.titulo ||
        !taskData?.descripcion ||
        !taskData?.valorActividad ||
        !taskData?.factorEmisionId ||
        !taskData?.emisionesCO2e
      ) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completá los campos solicitados",
          confirmButtonColor: "#f0ad4e",
        });
        return;
      }
      const result = await AddTask(taskData);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "¡Tarea agregada!",
          text: "La tarea se agregó correctamente.",
          confirmButtonColor: "#44af69",
        });
        fetchProjects();
      } else {
        Swal.fire({
          icon: "error",
          title: "No se pudo agregar la tarea",
          text: "Por favor, revisá los datos e intentá nuevamente.",
          confirmButtonColor: "#d33",
        });
        fetchProjects();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Ocurrió un error inesperado. Intentalo más tarde.",
        confirmButtonColor: "#d33",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const UpTask = async () => {
    try {
      setOpenModal(false);
      if (!taskData?.titulo || !taskData?.descripcion) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor completá el título y la descripción.",
          confirmButtonColor: "#f0ad4e",
        }).then(() => {
          window.location.reload();
        });
        return;
      }
      const result = await UpdateTaskt(taskData);

      if (result) {
        setEditTaskId(null);
        Swal.fire({
          icon: "success",
          title: "¡Tarea actualizada!",
          text: "La tarea se agregó correctamente.",
          confirmButtonColor: "#44af69",
        });
        fetchProjects();
      } else {
        Swal.fire({
          icon: "error",
          title: "No se pudo actualizar la tarea",
          text: "Por favor, revisá los datos e intentá nuevamente.",
          confirmButtonColor: "#d33",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Ocurrió un error inesperado. Intentalo más tarde.",
        confirmButtonColor: "#d33",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const DTask = async (taskID) => {
    let task = await DeleteTask(taskID);
    setOpenModal(false);
    if (task) {
      Swal.fire({
        icon: "success",
        title: "Tarea Eliminado!",
        text: "El proyecto se ha eliminado correctamente.",
        confirmButtonColor: "#44af69",
      });
      fetchProjects();
    } else {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar la tarea",
        text: "Por favor, revisá los datos e intentá nuevamente.",
        confirmButtonColor: "#d33",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const handleTaskDataChange = (field, value) => {
    const updatedData = { ...taskData, [field]: value };

    // Si ya tenemos valor de actividad y factor, calculamos emisiones
    const actividad = parseFloat(updatedData.valorActividad);
    const factorObj = reductionUnit.find(
      (u) => u.id === Number(updatedData.factorEmisionId)
    );

    if (actividad && factorObj) {
      updatedData.emisionesCO2e = (actividad * factorObj.valueFactor).toFixed(
        2
      ); // opcional: 2 decimales
    } else {
      updatedData.emisionesCO2e = "";
    }

    setTasktData(updatedData);
  };

  const handleEditTask = (task) => {
    handleTaskDataChange("valorActividad", task.valorActividad);
    handleTaskDataChange("FactorEmisionId", task.valueFactor);
    setTasktData(task); // precarga los datos
    setTabIndex(0); // cambia al tab de agregar/editar
    setIsEditing(true);
  };

  const columns = [
    { Header: "Nombre", accessor: "nombre", align: "left" },
    { Header: "Descripción", accessor: "descripcion", align: "left" },
    { Header: "Inicio", accessor: "fechaInicio", align: "center" },
    { Header: "Final", accessor: "fechaFinal", align: "center" },
    { Header: "Estado", accessor: "estatus", align: "center" },

    { Header: "Acciones", accessor: "action", align: "center" },
  ];

  const rows = projects.map((project) => ({
    nombre: (
      <MDTypography variant="caption" fontWeight="medium">
        {project.nombre}
      </MDTypography>
    ),
    descripcion: (
      <MDTypography variant="caption" color="text">
        {project.descripcion}
      </MDTypography>
    ),

    fechaInicio: (
      <MDTypography variant="caption" color="text">
        {dayjs(project.fechaInicio, "DD-MM-YYYY").format("DD/MM/YYYY")}
      </MDTypography>
    ),
    fechaFinal: (
      <MDTypography variant="caption" color="text">
        {dayjs(project.fechaFinal, "DD-MM-YYYY").format("DD/MM/YYYY")}
      </MDTypography>
    ),
    estatus: (
      <MDTypography variant="caption" color="text">
        {project.estatus ? "Realizado" : "Pendiente"}
      </MDTypography>
    ),
    action: (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Tooltip title="Ver detalles">
          <IconButton size="small" onClick={() => VerMas(project.proyectoId)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            size="small"
            color="info"
            onClick={() => openModalUpdateProject(project)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            color="error"
            onClick={() => DeleteProject(project.proyectoId)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <MDBox py={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MDBox mb={2}>
            <MDBox
              borderRadius="xl"
              border="1px solid #ccc"
              p={3}
              mb={2}
              bgColor="white"
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <MDBox display="flex" flexDirection="column">
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <FilterAltOutlinedIcon fontSize="medium" />
                      <MDTypography variant="h6">
                        Filtros y Acciones
                      </MDTypography>
                    </MDBox>
                    <MDTypography variant="body2" color="text">
                      Filtra los proyectos por estado y fechas
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item>
                  <MDButton
                    variant="outlined"
                    sx={{
                      borderColor: "#4CAF50",
                      color: "#4CAF50",
                      "&:hover": {
                        backgroundColor: "#E8F5E9",
                        borderColor: "#43A047",
                        color: "#388E3C",
                      },
                    }}
                    onClick={openModalAddProject}
                  >
                    Nuevo Proyecto
                  </MDButton>
                </Grid>
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                mt={2}
              >
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <FormControl size="medium" sx={{ width: 180 }}>
                        <InputLabel id="Estado-label">Estado</InputLabel>
                        <Select
                          labelId="Estado-label"
                          name="estado"
                          label="Estado"
                          fullWidth
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          sx={{ height: 45 }}
                        >
                          <MenuItem value="todos">Todos</MenuItem>
                          <MenuItem value="true">Realizados</MenuItem>
                          <MenuItem value="false">Pendientes</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item>
                      <DatePicker
                        label="Fecha Inicio"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{
                          textField: {
                            size: "small",
                            sx: {
                              width: 180, // más angosto
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <DatePicker
                        label="Fecha Fin"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        slotProps={{
                          textField: {
                            size: "small",
                            sx: {
                              width: 180, // más angosto
                              "& input": {
                                padding: "6px 8px",
                                fontSize: 13, // menos espacio interno
                              },
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <MDBox display="flex" gap={1}>
                    <MDButton
                      onClick={SearchByDate}
                      variant="outlined"
                      color="info"
                    >
                      Buscar por fecha
                    </MDButton>
                    <MDButton
                      onClick={CleanDates}
                      variant="outlined"
                      color="secondary"
                    >
                      Limpiar fechas
                    </MDButton>
                    {Array.isArray(data) && data.length > 0 && (
                      <MDButton
                        variant="outlined"
                        onClick={CreatePDFAPI}
                        color="error"
                      >
                        Descargar PDF
                      </MDButton>
                    )}
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {/* Tabla de proyectos */}
            <Grid size={{ xs: 12 }} mt={10}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="success"
                  borderRadius="lg"
                  coloredShadow="success"
                >
                  <MDTypography variant="h6" color="white" align="left">
                    Proyectos
                  </MDTypography>
                </MDBox>
                <MDBox>
                  <MDBox>
                    <Grid container spacing={5}>
                      <Grid size={{ xs: 12 }}>
                        <Card>
                          <MDBox pt={3}>
                            <DataTable
                              table={{ columns, rows }}
                              isSorted={false}
                              entriesPerPage={false}
                              showTotalEntries={true}
                              noEndBorder
                              loading={loading}
                            />
                          </MDBox>
                        </Card>
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </MDBox>
        </LocalizationProvider>
      </MDBox>

      <Modal
        onClose={CloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: "90vh", // alto máximo en pantalla
            overflowY: "auto", // activa scroll vertical
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Cargando detalles...</Typography>
            </Box>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Typography variant="h6" gutterBottom>
                Detalles del Proyecto: {tasks[0].proyect}
              </Typography>

              {tasks.map((task) => (
                <Box
                  key={task.taskId}
                  sx={{
                    mb: 2,
                    p: 1,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  {editTaskId === task.taskId ? (
                    <>
                      <TextField
                        label="Título"
                        fullWidth
                        value={taskData.titulo}
                        onChange={(e) =>
                          setTasktData({ ...taskData, titulo: e.target.value })
                        }
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Descripción"
                        fullWidth
                        multiline
                        rows={2}
                        value={taskData.descripcion}
                        onChange={(e) =>
                          setTasktData({
                            ...taskData,
                            descripcion: e.target.value,
                          })
                        }
                        sx={{ mb: 1 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <MDButton
                          variant="outlined"
                          color="error"
                          onClick={() => setEditTaskId(null)}
                        >
                          Cancelar
                        </MDButton>
                        <MDButton
                          variant="outlined"
                          color="info"
                          onClick={() => UpTask()}
                        >
                          Guardar
                        </MDButton>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Tarea: {task.titulo}
                      </Typography>
                      <Typography>Descripción: {task.descripcion}</Typography>
                      <Typography>
                        Estado:{" "}
                        {taskStatus[task.taskId] ? "Completada" : "Pendiente"}
                      </Typography>
                      <Switch
                        checked={!!taskStatus[task.taskId]}
                        onChange={UpdateStatusTasks(task.taskId)}
                        color="primary"
                        inputProps={{ "aria-label": "cambiar estado tarea" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <MDButton
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => {
                            DTask(task.taskId);
                          }}
                        >
                          Eliminar
                        </MDButton>

                        <MDButton
                          color="info"
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setEditTaskId(task.taskId);
                            setTasktData({
                              TaskId: task.taskId,
                              proyectID: task.proyectID,
                              titulo: task.titulo,
                              descripcion: task.descripcion,
                            });
                          }}
                        >
                          Editar
                        </MDButton>
                      </Box>
                    </>
                  )}
                </Box>
              ))}
              {/* Parte para agregar una tarea */}
            </>
          ) : (
            <Typography>No hay tareas para mostrar</Typography>
          )}
          <Box
            sx={{
              mt: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              backgroundColor: "rgba(0,0,0,0)",
            }}
          >
            <Typography variant="subtitle1">Agregar nueva tarea</Typography>
            <TextField
              label="Título"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) =>
                setTasktData({ ...taskData, titulo: e.target.value })
              }
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={2}
              sx={{ mt: 1 }}
              onChange={(e) =>
                setTasktData({ ...taskData, descripcion: e.target.value })
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <MDButton variant="outlined" color="error" onClick={CloseModal}>
              Cerrar
            </MDButton>
            <MDButton
              color="success"
              variant="contained"
              onClick={SubmitModalTask}
            >
              Agregar
            </MDButton>
          </Box>
        </Box>
      </Modal>

      {/* Modal para agregar un nuevo proyecto */}
      <Modal
        open={openModalProjects}
        onClose={CloseModal}
        aria-labelledby="add-product-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 750,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">
            {modoEdicion ? "Editar Proyecto" : "Nuevo Proyecto"}
          </Typography>

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            margin="normal"
            value={projectData.nombre}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            margin="normal"
            value={projectData.descripcion}
            onChange={handleChange}
            multiline
            rows={3}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Inicio"
                value={
                  projectData.fechaInicio
                    ? dayjs(projectData.fechaInicio, "DD-MM-YYYY")
                    : null
                }
                onChange={(newValue) => {
                  setProjecttData((prev) => ({
                    ...prev,
                    fechaInicio: newValue ? newValue.format("DD-MM-YYYY") : "",
                  }));
                }}
                inputFormat="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      width: 350, // más angosto
                      "& .MuiInputBase-root": {
                        fontSize: 2, // opcional: fuente más pequeña
                      },
                      "& input": {
                        padding: "6px 8px",
                        fontSize: 9, // menos espacio interno
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha Final"
                value={
                  projectData.fechaFinal
                    ? dayjs(projectData.fechaFinal, "DD-MM-YYYY")
                    : null
                }
                onChange={(newValue) => {
                  setProjecttData((prev) => ({
                    ...prev,
                    fechaFinal: newValue ? newValue.format("DD-MM-YYYY") : "",
                  }));
                }}
                inputFormat="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      width: 350, // más angosto
                      "& .MuiInputBase-root": {
                        fontSize: 2, // opcional: fuente más pequeña
                      },
                      "& input": {
                        padding: "6px 8px",
                        fontSize: 9, // menos espacio interno
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ mt: 3, textAlign: "right" }}>
            <MDButton
              variant="outlined"
              color="error"
              onClick={close}
              sx={{ mr: 1 }}
            >
              Cancelar
            </MDButton>
            <MDButton
              variant="gradient"
              color="success"
              onClick={SubmitModalEdicion}
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </MDButton>
          </Box>
        </Box>
      </Modal>
      {/* Fin del Modal para agregar un nuevo proyecto */}

      <Dialog open={openModal} onClose={CloseModal} fullWidth maxWidth="md">
        <DialogTitle>Gestión de Actividades</DialogTitle>
        <DialogContent dividers>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Agregar Actividades" />
            <Tab label="Ver Actividades" />
          </Tabs>

          {tabIndex === 0 && (
            <Box mt={2}>
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                margin="normal"
                value={taskData.titulo}
                onChange={(e) =>
                  setTasktData({ ...taskData, titulo: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                margin="normal"
                multiline
                rows={2}
                value={taskData.descripcion}
                onChange={(e) =>
                  setTasktData({
                    ...taskData,
                    descripcion: e.target.value,
                  })
                }
              />
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                {/* Campo Valor Actividad */}
                <TextField
                  fullWidth
                  label="Valor Actividad"
                  name=""
                  value={taskData.valorActividad || ""}
                  onChange={(e) =>
                    handleTaskDataChange("valorActividad", e.target.value)
                  }
                />

                {/* Campo Factor de emisión */}
                <FormControl fullWidth>
                  <InputLabel id="unidad-label">Factor de emisión</InputLabel>
                  <Select
                    labelId="unidad-label"
                    id="factorEmisionId"
                    value={taskData.factorEmisionId || ""}
                    sx={{ height: 40 }}
                    onChange={(e) =>
                      handleTaskDataChange("factorEmisionId", e.target.value)
                    }
                  >
                    {Array.isArray(reductionUnit) &&
                      reductionUnit.map((unidad) => (
                        <MenuItem key={unidad.id} value={unidad.id}>
                          {unidad.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                label="Emisiones CO2"
                name="EmisionesCO2e"
                margin="normal"
                value={taskData.emisionesCO2e || ""}
                InputProps={{
                  readOnly: true, // así el usuario no lo puede cambiar
                }}
              />
            </Box>
          )}

          {tabIndex === 1 && (
            <Box mt={2}>
              {tasks.length === 0 ? (
                <Typography>No hay actividades registradas.</Typography>
              ) : (
                <List>
                  {tasks.map((task) => (
                    <ListItem
                      key={task.taskId}
                      divider
                      secondaryAction={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Switch
                            checked={!!taskStatus[task.taskId]}
                            onChange={UpdateStatusTasks(task.taskId)}
                            inputProps={{
                              "aria-label": "cambiar estado tarea",
                            }}
                            sx={{
                              "& .MuiSwitch-thumb": {
                                backgroundColor: taskStatus[task.taskId]
                                  ? "#2DA14C"
                                  : "#D32F2F",
                              },
                              "& .Mui-checked": {
                                color: taskStatus[task.taskId]
                                  ? "#2DA14C"
                                  : "#D32F2F",
                              },
                              "& .MuiSwitch-track": {
                                backgroundColor: taskStatus[task.taskId]
                                  ? "#81ac82ff"
                                  : "#FFCDD2",
                              },
                            }}
                          />

                          <IconButton
                            color="info"
                            edge="end"
                            aria-label="editar"
                            onClick={() => handleEditTask(task)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            edge="end"
                            aria-label="editar"
                            sx={{ mr: 2 }}
                            onClick={() => {
                              DTask(task.taskId);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={task.titulo + " - " + task.emisionesCO2e}
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            <Typography variant="body2">
                              <strong>Descripción:</strong> {task.descripcion}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
                              <Typography variant="body2">
                                <strong>Valor actividad:</strong>{" "}
                                {task.valorActividad}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Factor de emisión:</strong>{" "}
                                {task.factorEmisionName}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton color="error" variant="outlined" onClick={CloseModal}>
            Cerrar
          </MDButton>

          {tabIndex === 0 && (
            <MDButton
              variant="contained"
              color="success"
              onClick={() => {
                if (IsEditing) {
                  UpTask(); // método de actualizar
                } else {
                  SubmitModalTask(); // método de crear
                }
              }}
            >
              Guardar
            </MDButton>
          )}
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}
export default ProjectPage;
