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
import Forgot from './componentes/Forgot';
import Reset from './componentes/Reset';
import Confirm from './componentes/Confirm';
import NotFound from './componentes/NotFound';

import { auth } from './servicios/Credenciales';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <div>
                <Encabezado />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registrarse" element={<Registrarse />} />

                    {/* Rutas agregadas para recuperación de contraseña */}
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/reset/:token" element={<Reset />} />
                    <Route path="/confirm/:token" element={<Confirm />} />
                    <Route path="*" element={<NotFound />} />

                </Routes>
                <PieDePagina />
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
            </div>
        </Router>
    );
}

export default App;
