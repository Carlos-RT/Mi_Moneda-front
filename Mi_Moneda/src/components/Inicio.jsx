import React from "react";
import { Link, useNavigate } from "react-router-dom";
import fondoinicio from "/imagenes/fondo_inicio.jpg";

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <span
            className="nav-brand"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Mi Moneda💰
          </span>

          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/meta">Mi Meta</Link></li>
            <li><Link to="/bancos">Bancos</Link></li>
          </ul>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div
        style={{
          backgroundImage: `url(${fondoinicio})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          marginTop: "0px",   // 👈 levanta el fondo debajo del navbar
          paddingTop: "100px",  // 👈 evita que el contenido se pegue al navbar
        }}
      >
        <main>
          <div className="container section">
            <div className="row">
              <div className="col">
                <div className="card">
                  <h2>Bienvenido a Mi Moneda💰</h2>
                  <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
                    Organiza tus metas financieras, recibe recomendaciones
                    inteligentes y controla tu progreso de forma sencilla.
                  </p>

                  <button
                    className="btn btn-primary"
                    style={{ marginTop: "15px" }}
                    onClick={() => navigate("/meta")}
                  >
                    Configurar mi meta
                  </button>
                </div>

                <div className="card">
                  <h3>¿Qué puedes hacer aquí?</h3>
                  <ul className="list" style={{ marginTop: "12px" }}>
                    <li>Calcular planes de ahorro personalizados.</li>
                    <li>Recibir alertas y recomendaciones.</li>
                    <li>Explorar opciones bancarias para ayudarte a cumplir tus metas.</li>
                    <li>Hacer seguimiento del progreso mes a mes.</li>
                  </ul>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <h3>Consejos rápidos</h3>
                  <ul className="list" style={{ marginTop: "12px" }}>
                    <li>Registra metas pequeñas para mantener motivación.</li>
                    <li>Automatiza tus ahorros si es posible.</li>
                    <li>Evita gastos innecesarios en el mes.</li>
                    <li>Revisa la sección “Bancos” para más opciones.</li>
                  </ul>
                </div>

                <div className="card">
                  <h3>Comienza ahora</h3>
                  <p style={{ marginTop: "10px" }}>
                    Da el primer paso y construye tu plan financiero.
                  </p>
                  <button
                    className="btn btn-outline"
                    style={{ marginTop: "15px" }}
                    onClick={() => navigate("/meta")}
                  >
                    Crear mi meta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer
        style={{
          backgroundColor: "white",
          textAlign: "center",
          padding: "20px 0",
          borderTop: "1px solid #ccc",
          marginTop: "40px",
          width: "100%",
        }}
      >
        <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
          © {new Date().getFullYear()} Mi Moneda💰 — Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
}
