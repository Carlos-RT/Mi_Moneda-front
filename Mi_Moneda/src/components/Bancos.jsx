import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fondobancos from "/imagenes/Fondo_bancos.png";
import NuLogo from "/imagenes/Nu.png";
import LuloLogo from "/imagenes/Lulo.jpg";
import CredyLogo from "/imagenes/Credy.jpeg";
import MejorCDTLogo from "/imagenes/MejorCDT.png";

export default function Bancos() {
  const navigate = useNavigate();

  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [applicationSent, setApplicationSent] = useState(false);

  // estados del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");

  const bankList = [
    {
      id: 1,
      name: "Nubank",
      logo: NuLogo,
      description:
        "Cuenta digital con ahorro automático y total control desde la app.",
      benefits: [
        "Crea metas de ahorro con transferencias automáticas.",
        "No cobra cuota de manejo.",
        "Su app facilita ver tu progreso y fomenta disciplina financiera.",
        "Intereses competitivos en NuCuenta."
      ],
      habitAdvice:
        "Nubank te ayuda a crear hábitos de ahorro gracias a sus funciones de organización automática y control visual del dinero.",
      externalLink: "https://nu.com.co/"
    },
    {
      id: 2,
      name: "Lulo Bank",
      logo: LuloLogo,
      description: "Cuenta digital colombiana con ahorro programado flexible.",
      benefits: [
        "Bolsillos para separar el dinero por metas.",
        "Ahorro programado con transferencias automáticas.",
        "Operaciones sin costo desde la app.",
        "Te permite visualizar tu avance mes a mes."
      ],
      habitAdvice:
        "Con los bolsillos de Lulo Bank puedes separar tu ahorro del gasto diario, lo que refuerza el hábito de destinar dinero a tus metas.",
      externalLink: "https://www.lulobank.com/"
    },
    {
      id: 3,
      name: "Credy (Créditos rápidos)",
      logo: CredyLogo,
      description: "Solicita créditos en línea de forma rápida y segura.",
      benefits: [
        "Aprobación rápida con pocos requisitos.",
        "Ideal para cubrir emergencias o complementar metas.",
        "Ofertas de diferentes entidades para elegir mejor.",
        "Proceso 100% en línea."
      ],
      habitAdvice:
        "Tomar un crédito responsablemente puede ayudarte a crear disciplina financiera y fortalecer tu hábito de pago mensual.",
      externalLink: "https://www.credy.com.co/"
    },
    {
      id: 4,
      name: "MejorCDT",
      logo: MejorCDTLogo,
      description: "Plataforma para encontrar los mejores CDT del país.",
      benefits: [
        "Comparador de CDT con tasas altas.",
        "Ahorro seguro y con rentabilidad garantizada.",
        "Plazos desde corto hasta largo período.",
        "Ideal para metas de ahorro programado."
      ],
      habitAdvice:
        "Un CDT te obliga a ahorrar a plazo fijo, ayudándote a generar constancia y protegiéndote de gastos impulsivos.",
      externalLink: "https://www.mejorcdt.com/"
    }
  ];

  // ------- LISTA DE INVERSIONES (corto/mediano plazo, online) -------
  const investmentList = [
    {
      id: 1,
      name: "Trading de divisas (Forex)",
      description:
        "Compra y venta de pares de monedas como EUR/USD, GBP/USD o USD/JPY desde plataformas en línea. Es una forma de intentar hacer crecer tu dinero aprovechando movimientos de precio de corto plazo.",
      benefits: [
        "Mercado abierto casi 24/5, puedes operar en los horarios que mejor se ajusten a tu día.",
        "Posibilidad de empezar con montos relativamente bajos a través de brokers regulados.",
        "Permite aprovechar movimientos de corto plazo (horas o días).",
        "Existe mucha educación básica gratuita para aprender el funcionamiento del mercado."
      ],
      habitAdvice:
        "Operar Forex con un plan, registro de operaciones y montos pequeños al inicio puede ayudarte a desarrollar disciplina y control emocional.",
      externalLink: "https://www.fxstreet.com/rates-charts"
    },
    {
      id: 2,
      name: "Trading en oro y materias primas",
      description:
        "Operar activos como el oro (XAU/USD) o el petróleo a través de plataformas de inversión. Son mercados muy seguidos a nivel mundial y se usan para diversificar.",
      benefits: [
        "Activos con mucha información y análisis disponibles.",
        "Te permiten diversificar más allá de monedas y productos bancarios.",
        "Puedes buscar tendencias claras en momentos de incertidumbre económica.",
        "Se gestionan desde la misma plataforma del broker, sin trámites físicos."
      ],
      habitAdvice:
        "Invertir en oro u otras materias primas con un plan de riesgo definido refuerza el hábito de no arriesgar más de lo que estás dispuesto a perder.",
      externalLink: "https://www.fxstreet.com/commodities"
    },
    {
      id: 3,
      name: "Trading de criptomonedas",
      description:
        "Compra y venta de criptoactivos como Bitcoin, Ethereum o Solana desde exchanges o brokers en línea. Es un mercado muy dinámico y disponible 24/7.",
      benefits: [
        "Acceso totalmente digital desde aplicaciones móviles o web.",
        "Posibilidad de empezar con montos muy pequeños.",
        "Gran variedad de activos para elegir según tu perfil.",
        "Herramientas gráficas, alertas y contenido educativo disponibles en línea."
      ],
      habitAdvice:
        "Por ser un mercado muy volátil, es clave definir límites claros y objetivos realistas, lo que fortalece tus hábitos de gestión del riesgo y paciencia.",
      externalLink: "https://www.fxstreet.com/cryptocurrencies"
    }
  ];

  // ----------- ENVÍO A GOOGLE SHEETS -----------
  async function handleSubmit(e, tipo, origen) {
    e.preventDefault();

    if (!nombre || !correo) {
      alert("Por favor completa tu nombre y correo.");
      return;
    }

    try {
      const url =
        "https://script.google.com/macros/s/AKfycbzx99X4NBINNjgd8Ra5GXNK7ikKTXQICVRVj4LDDMo53I4hFKSYd2QfXEynFbrdftawMg/exec";

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre,
          correo: correo,
          comentario: comentario,
          tipo: tipo, // "banco" o "inversion"
          origen: origen // nombre del banco o inversión seleccionada
        })
      });

      setApplicationSent(true);

      // limpiar campos
      setNombre("");
      setCorreo("");
      setComentario("");

      setTimeout(() => {
        setApplicationSent(false);
        // dejamos la selección visible para que sigan leyendo si quieren
      }, 5000);
    } catch (err) {
      console.error("Error al enviar:", err);
      alert("No se logró enviar la solicitud.");
    }
  }

  return (
    <>
      {/* NAV */}
      <nav className="navbar">
        <div className="container">
          <span className="nav-brand" onClick={() => navigate("/")}>
            Mi Moneda💰
          </span>

          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/meta">Mi Meta</Link></li>
            <li><Link to="/bancos">Bancos</Link></li>
          </ul>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div
        style={{
          backgroundImage: `url(${fondobancos})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          paddingTop: "100px"
        }}
      >
        <main className="container section">
          {/* OPCIONES BANCARIAS */}
          <div className="card-title">
            <h2 style={{ marginBottom: "20px" }}>Opciones Bancarias</h2>
          </div>

          <div className="row">
            {/* LISTA DE BANCOS */}
            <div className="col-5">
              <div className="card">
                <h3>Selecciona un banco</h3>

                <ul className="list" style={{ marginTop: "12px" }}>
                  {bankList.map((bank) => (
                    <li
                      key={bank.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedBank(bank);
                        setSelectedInvestment(null);
                        setApplicationSent(false);
                      }}
                    >
                      <strong>{bank.name}</strong>
                      <br />
                      <span style={{ fontSize: "0.9rem", color: "#555" }}>
                        {bank.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DETALLES DEL BANCO */}
            <div className="col-7">
              {selectedBank ? (
                <div className="card">
                  {selectedBank.logo && (
                    <img
                      src={selectedBank.logo}
                      alt={selectedBank.name}
                      style={{
                        width: "120px",
                        height: "auto",
                        marginBottom: "15px",
                        borderRadius: "8px"
                      }}
                    />
                  )}

                  <h3>{selectedBank.name}</h3>

                  <p style={{ marginTop: "8px" }}>{selectedBank.description}</p>

                  <p
                    style={{
                      marginTop: "10px",
                      background: "rgba(255,255,255,0.5)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontStyle: "italic"
                    }}
                  >
                    {selectedBank.habitAdvice}
                  </p>

                  <h4 style={{ marginTop: "15px" }}>Beneficios</h4>
                  <ul className="list" style={{ marginTop: "10px" }}>
                    {selectedBank.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>

                  {selectedBank.externalLink && (
                    <a
                      href={selectedBank.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "10px",
                        color: "#0056b3",
                        textDecoration: "underline",
                        fontSize: "0.95rem"
                      }}
                    >
                      Ir al sitio oficial
                    </a>
                  )}

                  <h4 style={{ marginTop: "20px" }}>Solicitar información</h4>

                  {!applicationSent ? (
                    <form
                      onSubmit={(e) =>
                        handleSubmit(e, "banco", selectedBank.name)
                      }
                      style={{ marginTop: "10px" }}
                    >
                      <label className="form-label">Nombre completo</label>
                      <input
                        className="input"
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />

                      <label className="form-label">Correo electrónico</label>
                      <input
                        className="input"
                        type="email"
                        required
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />

                      <label className="form-label">
                        Comentario opcional
                      </label>
                      <textarea
                        className="input"
                        style={{ height: "80px", resize: "none" }}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                      />

                      <button
                        className="btn btn-primary"
                        style={{ marginTop: "10px" }}
                      >
                        Enviar solicitud
                      </button>
                    </form>
                  ) : (
                    <div
                      className="card"
                      style={{
                        marginTop: "15px",
                        background: "#e8f4ff",
                        borderLeft: "4px solid #007bff"
                      }}
                    >
                      <strong>Solicitud enviada correctamente.</strong>
                      <p style={{ marginTop: "6px" }}>
                        Un asesor se comunicará contigo pronto.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card">
                  <h3>Selecciona un banco para ver los detalles</h3>
                  <p style={{ color: "#666", marginTop: "10px" }}>
                    Aquí aparecerá la información completa del banco.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN DE INVERSIONES */}
          <div className="card-title" style={{ marginTop: "40px" }}>
            <h2 style={{ marginBottom: "20px" }}>Opciones de Inversión en Línea</h2>
            <p style={{ color: "#555", maxWidth: "700px" }}>
              Estas inversiones están pensadas para personas que quieren hacer
              crecer su dinero en el corto o mediano plazo desde Internet. Todas
              implican riesgo: es importante formarse, empezar con montos
              pequeños y nunca invertir dinero que necesites para gastos
              básicos.
            </p>
          </div>

          <div className="row">
            {/* LISTA DE INVERSIONES */}
            <div className="col-5">
              <div className="card">
                <h3>Selecciona una inversión</h3>

                <ul className="list" style={{ marginTop: "12px" }}>
                  {investmentList.map((inv) => (
                    <li
                      key={inv.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedInvestment(inv);
                        setSelectedBank(null);
                        setApplicationSent(false);
                      }}
                    >
                      <strong>{inv.name}</strong>
                      <br />
                      <span style={{ fontSize: "0.9rem", color: "#555" }}>
                        {inv.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DETALLES DE LA INVERSIÓN */}
            <div className="col-7">
              {selectedInvestment ? (
                <div className="card">
                  <h3>{selectedInvestment.name}</h3>

                  <p style={{ marginTop: "8px" }}>
                    {selectedInvestment.description}
                  </p>

                  <p
                    style={{
                      marginTop: "10px",
                      background: "rgba(255,255,255,0.5)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontStyle: "italic"
                    }}
                  >
                    {selectedInvestment.habitAdvice}
                  </p>

                  <h4 style={{ marginTop: "15px" }}>Beneficios</h4>
                  <ul className="list" style={{ marginTop: "10px" }}>
                    {selectedInvestment.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>

                  {selectedInvestment.externalLink && (
                    <a
                      href={selectedInvestment.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "10px",
                        color: "#0056b3",
                        textDecoration: "underline",
                        fontSize: "0.95rem"
                      }}
                    >
                      Ver más información sobre este mercado
                    </a>
                  )}

                  <h4 style={{ marginTop: "20px" }}>
                    ¿Quieres empezar pero no sabes cómo? Contáctanos
                  </h4>

                  {!applicationSent ? (
                    <form
                      onSubmit={(e) =>
                        handleSubmit(
                          e,
                          "inversion",
                          selectedInvestment.name
                        )
                      }
                      style={{ marginTop: "10px" }}
                    >
                      <label className="form-label">Nombre completo</label>
                      <input
                        className="input"
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />

                      <label className="form-label">Correo electrónico</label>
                      <input
                        className="input"
                        type="email"
                        required
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />

                      <label className="form-label">
                        Cuéntanos qué te gustaría lograr con esta inversión
                      </label>
                      <textarea
                        className="input"
                        style={{ height: "80px", resize: "none" }}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                      />

                      <button
                        className="btn btn-primary"
                        style={{ marginTop: "10px" }}
                      >
                        Enviar y recibir orientación
                      </button>
                    </form>
                  ) : (
                    <div
                      className="card"
                      style={{
                        marginTop: "15px",
                        background: "#e8f4ff",
                        borderLeft: "4px solid #007bff"
                      }}
                    >
                      <strong>Información enviada correctamente.</strong>
                      <p style={{ marginTop: "6px" }}>
                        Te contactaremos para ayudarte a dar tus primeros pasos
                        de forma más segura.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card">
                  <h3>Selecciona una inversión para ver los detalles</h3>
                  <p style={{ color: "#666", marginTop: "10px" }}>
                    Aquí aparecerá la información completa de la inversión.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "white",
          textAlign: "center",
          padding: "20px 0",
          borderTop: "1px solid #ccc",
          marginTop: "40px",
          width: "100%"
        }}
      >
        <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
          © {new Date().getFullYear()} Mi Moneda💰 — Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
}
