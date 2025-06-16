import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import '../componentes/Encabezado.css';

const Encabezado = () => {
    return (
        <header>
            <div className="logo">
                <img src="/imagenes/logo.jpg" alt="Logo" />
                <span className="logo-text">Patitas Felices</span> {/* Agregamos el texto aquí */}
            </div>
            <nav>
                {/* Usa Link en lugar de <a> */}
                <Link to="/">Inicio</Link>
                <Link to="/servicios">Servicios</Link>
                <Link to="/contacto">Contacto</Link>
                <Link to="/login">Login</Link>
                <Link to="/registrarse">Registrarse</Link>
            </nav>
        </header>
    );
};

export default Encabezado;