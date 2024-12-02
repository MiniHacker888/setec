
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import '../css/home.css';
import '../css/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { nombre: '', email: '', password: '', role: '' },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Requerido'),
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
      role: Yup.string().required('Requerido'), 
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log('Datos enviados para registro:', values);
      try {
        
        // Enviar datos al backend para registrar el usuario

        await axios.post('http://localhost:5000/api/usuarios/register', values);
        toast.success('Registro exitoso!');

        // Redirigir a la página de login después de un registro exitoso

        navigate('/login');
      } catch (error) {
        console.error('Error al registrar:', error);
        toast.error(error.response?.data.message || 'Error al registrar usuario.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container className="register-container">
      <Typography variant="h4">Registro de Usuario</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
          required
          fullWidth
          margin="normal"
        />
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
        <h4>Escriba el Usuaurio Correspondiente</h4><h5>cliente-tecnico-admin</h5>
        <TextField
          label="Rol"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Cargando...' : 'Registrar'}
        </Button>
      </form>
    </Container>
  );
};

export default Register;
