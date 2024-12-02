import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ClienteDashboard from './components/ClienteDashboard';
import TecnicoDashboard from './components/TecnicoDashboard';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';
import { UserProvider, useUserContext } from './context/UserContext'; 
import About from './components/About';
import Contact from './components/Contact';
import Support from './components/Support';
import './css/home.css';


const App = () => {
  /*const { user } = useUserContext(); */

  return (
    <UserProvider>
    <Router>
    <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cliente-dashboard" element={<PrivateRoute role="cliente" Component={ClienteDashboard} />} />
          <Route path="/tecnico-dashboard" element={<PrivateRoute role="tecnico" Component={TecnicoDashboard} />} />
          <Route path="/admin-dashboard" element={<PrivateRoute role="admin" Component={AdminDashboard} />} />
          <Route path="/dashboard" element={<PrivateRoute role="user" Component={Dashboard} />} />
        </Routes>
        
      </div>
    </Router>
  </UserProvider>
  );
};
// Ruta privada para verificar si el usuario tiene el rol correcto
const PrivateRoute = ({ role, Component }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <Component />;
};


export default App;
