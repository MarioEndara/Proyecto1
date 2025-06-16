import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Encabezado from './componentes/Encabezado';
import Home from './componentes/Home';
import PieDePagina from './componentes/PieDePagina';
import LoginPage from './componentes/Login';
import Servicios from './componentes/Servicios';
import Productos from './componentes/Productos';
import Contacto from './componentes/Contacto';
import Registrarse from './componentes/Registrarse';
import { auth } from './servicios/Credenciales';



import { ToastContainer } from "react-toastify"; // Importamos ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importamos los estilos de Toastify

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Limpieza al desmontar el componente
    }, []);

    return (
        <Router>
            <div>
                <Encabezado /> {/* Encabezado común para todas las rutas */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/productos" element={<Productos />} /> {/* Ruta para Productos */}
                    <Route path="/contacto" element={<Contacto />} />  {/* Agrega esta ruta */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registrarse" element={<Registrarse />} />
                </Routes>
                <PieDePagina /> {/* Pie de página común para todas las rutas */}
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
            </div>
        </Router>
    );
}

export default App;
