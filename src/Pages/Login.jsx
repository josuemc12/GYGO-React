
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../API/Auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { success, isTwoFactor, tempToken, error } = await loginUser(email, password);

    if (!success) {
      setMessage(error || 'Login failed.');
      return;
    }
    
    if (isTwoFactor) {
      // Redirect to 2FA page
      navigate(`/verify-2fa?tempToken=${encodeURIComponent(tempToken)}`);
    } else {
      // Normal login success — redirect to dashboard or home
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}