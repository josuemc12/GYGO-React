import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {registerUser} from '../API/Auth';

export default function Register() {
  const { inviteToken } = useParams();
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerUser(inviteToken, form);

    if (response.success) {
      setMessage('Registro exitoso');
    } else {
      setMessage(response.error || 'Error en el registro');
    }
  };

  return (
    <div>
      <h2>Registro {inviteToken ? 'por invitación' : 'normal'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}