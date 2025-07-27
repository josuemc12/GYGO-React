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
    
const initialFormData = {
  id: 0,
  Name: "",
  Unit: 0,
  UnitCarbon: 0,
  UnitValue: 0,
  CarbonValue: 0,
  PCGId: 0,
  sourceId: 0,
  sectoId: 0,
};

  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emissionFactor = formData.carbonValue !== 0 ? formData.unitValue / formData.carbonValue : 0

useEffect(() => {
  if (isOpen) {
    if (editingFactor) {
      
      const unitId = measurementUnits.find(u => u.name === editingFactor.unit)?.id || 0;
      const unitCarbonId = measurementUnits.find(u => u.name === editingFactor.unitCarbono)?.id || 0;
      const sourceId = sources.find(s => s.name === editingFactor.source)?.id || 0;

      setFormData({
        id: editingFactor.id || 0,
        Name: editingFactor.name || "",
        Unit: unitId,
        UnitCarbon: unitCarbonId,
        UnitValue: editingFactor.valueUnit || 0,
        CarbonValue: editingFactor.valueEmision || 0,
        PCGId: editingFactor.pcg || 0,
        sourceId: sourceId,
        sectoId: editingFactor.sector || 0,
      });
    } else {
      setFormData(initialFormData);
    }
  }
}, [isOpen, editingFactor, measurementUnits, sources]);

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  const numericFields = ["Unit", "UnitCarbon", "UnitValue", "CarbonValue", "PCGId", "sourceId", "sectoId"];
  setFormData((prev) => ({
    ...prev,
    [name]: numericFields.includes(name) ? Number(value) : value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log(formData);
      await onSubmit(formData);
      onClose();
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
                name="Name"
                value={formData.Name}
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
                  name="Unit"
                  value={formData.Unit}
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
                  name="UnitCarbon"
                  value={formData.UnitCarbon}
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
                  name="UnitValue"
                  value={formData.UnitValue}
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
                  name="CarbonValue"
                  value={formData.CarbonValue}
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
                Factor de Emisión (Valor unitario ÷ Valor de emisión)
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
              name="PCGId"
              value={formData.PCGId}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1.5px solid #e0e3e7",
                backgroundColor: "#f8f9fa",
                fontSize: "1rem",
                color: "#344767",
                appearance: "none", 
                WebkitAppearance: "none",
                MozAppearance: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value={0} disabled hidden style={{ color: "#888" }}>
                Selecciona el PCG...
              </option>
              {pcgs.map((pcg) => (
                <option key={pcg.id} value={pcg.id} style={{ color: "#000" }}>
                  {pcg.name}
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
                <option value={0}>Selecciona la fuente...</option>
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