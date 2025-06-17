import { useState } from 'react';
import {sendInvite} from '../API/Auth';

export default function SendInvite() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendInvite(email);

    if (response.success) {
      setMessage('Invitación enviada exitosamente.');
    } else {
      setMessage(response.error || 'Error al enviar la invitación.');
    }
  };

  return (
    <div>
      <h2>Enviar Invitación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo del invitado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar Invitación</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}