
// src/components/Login.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';
import '../css/home.css';
import '../css/login.css';


const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/usuarios/login', values);
        localStorage.setItem('token', response.data.token);
        setUser({ role: response.data.usuario.role, token: response.data.token });

        const userRole = response.data.usuario.role;
        if (userRole === 'cliente') {
          navigate('/cliente-dashboard');
        } else if (userRole === 'tecnico') {
          navigate('/tecnico-dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin-dashboard');
        }
        toast.success('Inicio de sesión exitoso!');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        toast.error('Error al iniciar sesión. Verifica tus credenciales.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container className="login-container">
      <Typography variant="h4">Inicio de Sesión</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
