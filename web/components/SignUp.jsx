'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/v1/auth/signup', formData);
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button type="submit" style={{ marginTop: '10px' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
