import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';

const SuperAdminCancelModal = ({ 
  open, 
  onClose,
  onConfirm,
  groupId
}) => {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError("Por favor ingrese un motivo de cancelación");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      await onConfirm(groupId, reason);
      setSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.message || "Error al cancelar la suscripción");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setReason('');
      setError(null);
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Cancelar Suscripción
        </Typography>
        
        {success ? (
          <Alert severity="success">
            Suscripción cancelada exitosamente!
          </Alert>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Grupo ID: <strong>{groupId}</strong>
            </Typography>

            <TextField
              label="Motivo de cancelación*"
              multiline
              rows={4}
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              error={!!error}
              helperText={error}
              margin="normal"
              disabled={isLoading}
            />

            <Box sx={buttonContainerStyle}>
              <Button 
                onClick={handleClose}
                disabled={isLoading}
                variant="outlined"
                sx={{ mr: 2 }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !reason.trim()}
                color="error"
                variant="contained"
                endIcon={isLoading ? <CircularProgress size={24} /> : null}
              >
                Confirmar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

// Estilos separados para mejor legibilidad
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 1,
  outline: 'none'
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 2
};

export default SuperAdminCancelModal;