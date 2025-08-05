import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Paper,
  CircularProgress,
  Avatar,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostAddGroup } from "../API/AddGroup";
import { GetServices } from "../API/Services";
import MDButton from "components/MDButton";

export const AddGroupForm = () => {
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [correogrupo, setCorreogrupo] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [preview, setPreview] = useState(null); // para vista previa de la imagen

  const navigate = useNavigate();

  //Fetch para los servicios
  const fetchServices = async () => {
    try {
      const data = await GetServices();
      setServicesData(data);
    } catch (err) {
      console.error(err);
    }
  };
  ///Termina el fetch
  useEffect(() => {
    fetchServices();
  }, []);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!nombreGrupo || !correogrupo || !selectedService) {
        Swal.fire({
          icon: "warning",
          title: "No se pudo registrar la empresa",
          text: "Por favor, completá todos los campos.",
          confirmButtonColor: "#f8bb86",
        });
        return;
      }
      if (!imageFile) {
        Swal.fire({
          icon: "warning",
          title: "No se pudo registrar la empresa",
          text: "Por favor, ingrese el logo de la empresa",
          confirmButtonColor: "#f8bb86",
        });
        return;
      }
      const result = await PostAddGroup(
        nombreGrupo,
        correogrupo,
        selectedService,
        imageFile
      );
      setLoading(false);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "La empresa se ha sido registrado correctamente.",
          confirmButtonColor: "#2DA14C",
        }).then(() => {
          window.location.href = "/DashboardGroupPage";
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: result.error.message,
          confirmButtonColor: "#d33",
        }).then(() => {
          window.location.href = "/DashboardGroupPage";
        });
        return;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 1 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 1 }}>
            Complete los campos correspondientes
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre del Grupo"
              variant="outlined"
              margin="normal"
              required
              value={nombreGrupo}
              onChange={(e) => setNombreGrupo(e.target.value)}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={correogrupo}
              onChange={(e) => setCorreogrupo(e.target.value)}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Servicio</InputLabel>
              <Select
                label="Servicio"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                sx={{ height: 40 }}
              >
                {servicesData.map((service) => (
                  <MenuItem key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // centra horizontal
                alignItems: "center", // centra vertical
                height: "100%", // que tome todo el alto disponible
                width: "100%", // todo el ancho disponible
              }}
            >
              <Box
                onClick={() => document.getElementById("upload-input").click()}
                sx={{
                  mt: 4,
                  width: 280,
                  height: 160,
                  border: "2px dashed #30c622ff",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: preview ? "transparent" : "background.default",
                  "&:hover": {
                    borderColor: "#0e910eff",
                    bgcolor: "action.hover",
                  },
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Logo preview"
                    style={{
                      width: "95%",
                      height: "95%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography
                    color="text.secondary"
                    textAlign="center"
                    sx={{ px: 2 }}
                  >
                    Haz clic aquí o arrastra y suelta para subir el logo
                  </Typography>
                )}
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </Box>
            </Box>

            <MDButton
              type="submit"
              fullWidth
              color="success"
              sx={{
                mt: 3,
               
              
                "&:hover": {
                  backgroundColor: "#0e910eff", // mismo color o uno similar
                },
              }}
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Registrar"
              )}
            </MDButton>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
