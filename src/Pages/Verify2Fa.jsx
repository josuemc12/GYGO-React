import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {verify2FACode} from '../API/Auth';

export default function Verify2FA() {
  const [searchParams] = useSearchParams();
  const tempToken = searchParams.get('tempToken');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, error } = await verify2FACode(tempToken, code);

    if (success) {
      setMessage('Verification successful!');

    } else {
      setMessage(error || 'Verification failed.');
    }
  };

  return (
    <div>
      <h2>Enter 2FA Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}