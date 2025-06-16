import React from "react";
import '../componentes/Contacto.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Contacto = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="hero text-center text-white py-5">
        <div className="container">
          <h1 className="display-4">¿Aún te quedan algunas preguntas?</h1>
          <p className="lead">Llámanos al: 0982576832</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section text-center py-5">
        <h1 className="mb-4">Contáctanos</h1>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 gy-4">
            {[
              {
                href: "https://wa.me/0982576832",
                title: "Desde cualquier lugar",
                text: "Contáctanos Via Whatsapp",
                img: "imagenes/whatsapp-icon.png",
              },
              {
                href: "tel:+593022549425",
                title: "Convencional",
                text: "Oficina - Quito 022549425",
                img: "imagenes/phone-icon.png",
              },
              {
                href: "#mapa",
                title: "Más cerca de ti",
                text: "Estaremos donde tú nos necesites",
                img: "imagenes/location-icon.png",
              },
              {
                href: "#enviar-email",
                title: "Ayúdanos a mejorar",
                text: "Preguntas, Sugerencias, Quejas",
                img: "imagenes/feedback-icon.png",
              },
            ].map((item, index) => (
              <div className="col px-3" key={index}>
                <a href={item.href} className={`card contact-card contact-card-${index + 1} h-100 d-flex flex-column justify-content-center text-decoration-none`}>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <img src={item.img} alt={item.title} className="img-fluid" style={{ width: "50px" }} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instalaciones Section */}
      <section id="mapa" className="instalacion text-center py-5">
        <h2>ACUDE A NUESTRAS INSTALACIONES</h2>
        <div className="container">
          <div className="map-container">
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d593.0860493962231!2d-78.48996708744345!3d-0.2102291260648616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sec!4v1733088857714!5m2!1ses-419!2sec" 
              className="map-iframe"
              allowFullScreen
              loading="lazy"
              title="Ubicación"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="enviar-email" className="enviar text-center py-5">
        <h2>O ENVÍANOS UN EMAIL</h2>
        <div className="container">
          <form className="contact-form mx-auto">
            <input type="email" placeholder="Correo" className="form-control" required />
            <textarea placeholder="Mensaje" className="form-control" required></textarea>
            <button type="submit" className="btn btn-warning">Enviar</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contacto;