import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../servicios/firebase"; // Ajusta ruta si es necesario
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import { compararRostros } from "./faceplusplus"; // Asegúrate de tener esta función
import { collection, getDocs } from "firebase/firestore";
import "../componentes/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const logear = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      toast.error("Error al iniciar sesión: " + error.message);
    }
  };

  const handleFaceLogin = async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) {
      toast.error("No se pudo capturar rostro");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "Usuarios"));
      let match = null;

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const storedImage = data.photoBase64;
        if (!storedImage) continue;

        const compareResult = await compararRostros(screenshot, storedImage);
        const confidence = compareResult.confidence;

        if (confidence > 80) {
          match = data;
          break;
        }
      }

      if (match) {
        toast.success(`Bienvenido, ${match.firstName || "usuario"} 👋`);
        navigate("/");
      } else {
        toast.error("No se encontró coincidencia facial");
      }
    } catch (error) {
      console.error("Error al comparar rostros:", error);
      toast.error("Error en login facial");
    }
  };

  return (
    <main>
      <h3>Login</h3>
      <div className="loginPage">
        <h1 className="loginPage-title">Iniciar sesión</h1>

        {/* Formulario tradicional */}
        <form onSubmit={logear}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar sesión</button>

          <p className="forgot-password">
            ¿Nuevo usuario? <a href="/registrarse">Regístrate aquí</a>
          </p>
        </form>

        {/* Sección de login facial */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h4 style={{ marginBottom: "10px", color: "#333" }}>O inicia sesión con tu rostro:</h4>

          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
            style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          />

          <button onClick={handleFaceLogin} style={{ marginTop: "12px" }}>
            Login Facial
          </button>
        </div>

        <button className="regresar-btn" onClick={() => navigate("/")}>
          Regresar a Home
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
