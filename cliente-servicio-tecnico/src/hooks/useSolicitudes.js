// src/hooks/useSolicitudes.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/solicitudes');
                setSolicitudes(data);
            } catch (error) {
                console.error('Error al obtener las solicitudes:', error);
            }
        };

        fetchSolicitudes();
    }, []);

    
    return solicitudes;
};

export default useSolicitudes;
