


// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const UserContext = createContext();

// Crear el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    // Comprobar si hay un token en el localStorage al cargar la aplicación
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      

      setUser({ role: 'cliente', token: storedToken }); // Simulando que el usuario es un cliente
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Crear un hook para acceder fácilmente al contexto
export const useUserContext = () => {
  return useContext(UserContext);
};
