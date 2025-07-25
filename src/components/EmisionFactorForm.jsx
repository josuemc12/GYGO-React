import { useState, useEffect } from "react"

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

const EmissionFactorModal = ({ isOpen,
  onClose,
  onSubmit,
  editingFactor,
  measurementUnits,
  sectors,
  sources,
  pcgs}) => {
    
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    unit: 0,
    unitCarbon: 0,
    unitValue: 0,
    carbonValue: 0,
    pcgId: 0,
    sourceId: 0,
    sectoId: 0,
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emissionFactor = formData.carbonValue !== 0 ? formData.unitValue / formData.carbonValue : 0
  
  useEffect(() => {
    if (isOpen) {
      if (editingFactor) {
        if (editingFactor) {
          setFormData({
            id: editingFactor.id || 0,
            name: editingFactor.name || "",
            unit: typeof editingFactor.unit === "number" ? editingFactor.unit : 0,
            unitCarbon: typeof editingFactor.unitCarbon === "number" ? editingFactor.unitCarbon : 0,
            unitValue: editingFactor.unitValue || 0,
            carbonValue: editingFactor.carbonValue || 0,
            pcgId: editingFactor.pcgId || 0,
            sourceId: editingFactor.sourceId || 0,
            sectoId: editingFactor.sectoId || 0,
          });
}
      } else {
        setFormData({
          id: 0,
          name: "",
          unit: 0,
          unitCarbon: 0,
          unitValue: 0,
          carbonValue: 0,
          pcgId: 0,
          sourceId: 0,
          sectoId: 0,
        })
      }
    }
  }, [isOpen, editingFactor])

  const handleInputChange = (e) => {
  const { name, value, type } = e.target;
  
  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "number" || ["unit", "unitCarbon", "sourceId", "sectoId", "pcgId"].includes(name)
        ? Number(value) || 0
        : value,
  }));
};

  const handleEdit = (factor) => {
    setEditingFactor(factor);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log(formData);
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  
  const handleCloseModal = () => {
  setEditingFactor(null);
  setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  if (!isOpen) return null

   return (
    
    <Modal open={isOpen} onClose={onClose} aria-labelledby="add-product-modal">
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

          {/* Header */}
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <MDTypography variant="h5" fontWeight="bold" color="dark">
              {editingFactor ? "Editar Factor de Emisión" : "Crear Factor de Emisión"}
            </MDTypography>

          </MDBox>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ingresar el nombre del Factor de emisión"
                size="small"
              />
            </MDBox>

            <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
              <MDBox flex={1} minWidth="45%">
                <MDTypography variant="caption" fontWeight="medium" mb={1}>
                  Unidad de medida primaria
                </MDTypography>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    border: "1.5px solid #e0e3e7",
                    backgroundColor: "#f8f9fa",
                    fontSize: "1rem",
                    color: "#344767",
                  }}
                >
                  <option value={0}>Selecciona la unidad...</option>
                  {measurementUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </MDBox>

              <MDBox flex={1} minWidth="45%">
                <MDTypography variant="caption" fontWeight="medium" mb={1}>
                 Unidad de medida del carbono
                </MDTypography>
                <select
                  name="unitCarbon"
                  value={formData.unitCarbon}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    border: "1.5px solid #e0e3e7",
                    backgroundColor: "#f8f9fa",
                    fontSize: "1rem",
                    color: "#344767",
                  }}
                >
                  <option value={0}>Selecciona la unidad...</option>
                  {measurementUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </MDBox>
            </MDBox>

            <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
              <MDBox flex={1} minWidth="45%">
                <MDInput
                  fullWidth
                  type="number"
                  label="Valor unitario"
                  name="unitValue"
                  value={formData.unitValue}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="0.00"
                  size="small"
                />
              </MDBox>

              <MDBox flex={1} minWidth="45%">
                <MDInput
                  fullWidth
                  type="number"
                  label="Valor del carbono"
                  name="carbonValue"
                  value={formData.carbonValue}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="0.00"
                  size="small"
                />
              </MDBox>
            </MDBox>

            <MDBox mb={3}>
              <MDTypography variant="caption" fontWeight="medium" mb={1}>
                Factor de Emisión (Valor unitario ÷ Valor del carbono)
              </MDTypography>
              <MDTypography
                variant="h6"
                fontWeight="bold"
                color="info"
                sx={{
                  backgroundColor: "#e3f2fd",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "fit-content",
                  userSelect: "none",
                }}
              >
                {emissionFactor.toFixed(4)}
              </MDTypography>
            </MDBox>

            <MDBox mb={2}>
              <MDTypography variant="caption" fontWeight="medium" mb={1}>
                PCG (Greenhouse Gas)
              </MDTypography>
             

              <select
                name="pcgId"
                value={formData.pcgId}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 8,
                  border: "1.5px solid #e0e3e7",
                  backgroundColor: "#f8f9fa",
                  fontSize: "1rem",
                  color: "#344767",
                }}
              >
                <option value={0}>Selecciona el PCG...</option>
                {pcgs.map((pcg) => (
                  
                  <option key={pcg.id} value={pcg.id}>
                     {pcg.name ? pcg.name : `Sin nombre (ID: ${pcg.id})`}
                  </option>
                ))}
              </select>
            </MDBox>

            <MDBox display="flex" gap={2} flexWrap="wrap" mb={3}>
              <MDBox flex={1} minWidth="45%">
                <MDTypography variant="caption" fontWeight="medium" mb={1}>
                  Sector
                </MDTypography>
                <select
                  name="sectoId"
                  value={formData.sectoId}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    border: "1.5px solid #e0e3e7",
                    backgroundColor: "#f8f9fa",
                    fontSize: "1rem",
                    color: "#344767",
                  }}
                >
                  <option value={0}>Selecciona el sector...</option>
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </MDBox>

              <MDBox flex={1} minWidth="45%">
                <MDTypography variant="caption" fontWeight="medium" mb={1}>
                  Fuente
                </MDTypography>
                <select
                  name="sourceId"
                  value={formData.sourceId}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    border: "1.5px solid #e0e3e7",
                    backgroundColor: "#f8f9fa",
                    fontSize: "1rem",
                    color: "#344767",
                  }}
                >
                  <option value={0}>Seleccina la fuente...</option>
                  {sources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </MDBox>
            </MDBox>

            {/* Footer Buttons */}
            <MDBox display="flex" justifyContent="flex-end" gap={2}>
              <MDButton
                variant="outlined"
                color="secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cerrar
              </MDButton>
              <MDButton type="submit" color="info" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingFactor ? "Editar" : "Crear"}
              </MDButton>
            </MDBox>
          </form>
        
      </Box>
    </Modal>
  );
};

export default EmissionFactorModal