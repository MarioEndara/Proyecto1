import React from 'react';
import '../componentes/Home.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

const Contenido = () => {
  return (
    <main>
        <div>
        <section className="hero1">
        <div className="hero-content">
          <div className="hero-left">
            <p>Dale más diversión a tu mascota aun cuando no estás a su lado.</p>
          </div>
        </div>
        </section>
      <div className="banner">  
        <div className="titulo">
          <h2>Bienvenido a Patitas Felices</h2>
          <br />
          <p>Realizamos el cuidado y paseo de mascotas con horarios flexibles para tu amigo/a de vida.</p>
          <p>Algunos de nuestros servicios para tu mascota:</p>
          <br />
          <br />
          <br />
          <section className="services">
            <div className="service-item">
              <img src="imagenes/paseo.jpg" alt="Paseo canino" />
              <h2>Paseo Canino</h2>
              <a href="https://youtu.be/5JINwEyaCI4?t=58" target="_blank" rel="noopener noreferrer">
                <button className="botones">Beneficios</button>
              </a>
            </div>
            <div className="service-item">
              <img src="imagenes/cuidado.jpeg" alt="Cuidado cosmético" />
              <h2>Cuidado Cosmético</h2>
              <a href="https://vm.tiktok.com/ZMhKPmMJY/" target="_blank" rel="noopener noreferrer">
                <button className="botones">Beneficios</button>
              </a>
            </div>
            <div className="service-item">
              <img src="imagenes/alimentacion.jpeg" alt="Alimentación sana" />
              <h2>Alimentación Sana</h2>
              <a href="https://vm.tiktok.com/ZMhKP7Mep/" target="_blank" rel="noopener noreferrer">
                <button className="botones">Beneficios</button>
              </a>
            </div>
          </section>
        </div>
      </div>
      <div className="banner2">
        <div className="titulo2">
          <h2>DESCUBRE MÁS</h2>
          <section className="services2">
            <div className="service-item2">
              <h2>Misión</h2>
              <br />
              <p>En Patitas felices nos apasionan las mascotas. Por eso, nos esforzamos por ofrecer un servicio de cuidado y paseo de la más alta calidad, siempre poniendo la felicidad de tu mascota y tu tranquilidad en primer lugar.</p>
            </div>
          </section>
        </div>
      </div>
      <div className="banner3">
        <div className="titulo3">
          <section className="services3">
            <div className="service-item3">
              <h2>Visión</h2>
              <br />
              <p>En un futuro cercano tenemos las ansias de construir un centro integral de bienestar animal, que incluya servicios de cuidado, entrenamiento, rehabilitación y adopción.</p>
            </div>
          </section>
        </div>
      </div>
      <section className="about-us">
        <h2>SOBRE NOSOTROS</h2>
        <p>En Patitas Felices somos un equipo de profesionales amantes de los animales, dedicados a ofrecer servicios de cuidado y paseos personalizados para tus mascotas. Fundada con el objetivo de proporcionar una alternativa confiable y afectuosa para aquellos que buscan lo mejor para sus amigos peludos, nuestra empresa se caracteriza por el compromiso, la responsabilidad y el amor en todo lo que hacemos.</p>
      </section>
    </div>
    </main>


  );
};
export default Contenido;
