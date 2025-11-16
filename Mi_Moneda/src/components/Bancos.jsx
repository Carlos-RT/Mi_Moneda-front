// src/components/Bancos.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const sampleBanks = [
  { id: 1, bank: "Banco AhorroPlus", plan: "Cuenta Ahorro Programado", rate: "3.5% a.a.", desc: "Transferencias automáticas y libre disponibilidad." },
  { id: 2, bank: "CréditoFácil S.A.", plan: "Microcrédito para metas", rate: "7.2% a.a.", desc: "Plazos hasta 24 meses, cuotas fijas." },
  { id: 3, bank: "Inversión Local", plan: "CDT corto plazo", rate: "5.0% a.a.", desc: "Mejor para metas cortas con capital seguro." }
];

export default function Bancos() {
  const navigate = useNavigate();
  const [banks] = useState(sampleBanks);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");

  useEffect(() => {
    // nada especial que inicializar, pero mantener para la paridad con otros componentes
  }, []);

  function handleSelectPlan(id) {
    const b = banks.find(x => x.id === id);
    if (b) setSelectedPlan(`${b.bank} — ${b.plan} (${b.rate})`);
    // opcional: navegar a la sección de esta página (ya estamos aquí)
  }

  function handleApply(e) {
    e.preventDefault();
    if (!selectedPlan || !appName || !appEmail) {
      alert("Completa todos los campos");
      return;
    }
    alert("Solicitud enviada. Recibirás respuesta por correo. (Simulado)");
    // reiniciar
    setSelectedPlan("");
    setAppName("");
    setAppEmail("");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand nav-brand" href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>SmartSaving</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMain">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/meta">Mi Meta</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/bancos">Bancos</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-5">
        <section id="bank" className="view active">
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm mb-3">
                <div className="card-body">
                  <h5>Integración con entidades</h5>
                  <p>Simulamos planes y créditos que podrían ayudar a alcanzar tu meta.</p>

                  <div id="bankList" className="row gy-2">
                    {banks.map(b => (
                      <div className="col-md-12" key={b.id}>
                        <div className="card p-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{b.plan}</strong>
                              <div className="small text-muted">{b.bank} — {b.rate}</div>
                              <div className="mt-1">{b.desc}</div>
                            </div>
                            <div>
                              <button className="btn btn-sm btn-primary" onClick={() => handleSelectPlan(b.id)}>Seleccionar</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Solicitar plan</h6>
                  <p>Selecciona un plan y completa un formulario (simulado).</p>
                  <form id="applyForm" onSubmit={handleApply}>
                    <div className="mb-2">
                      <label className="form-label">Plan seleccionado</label>
                      <input id="selectedPlan" className="form-control" readOnly value={selectedPlan} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Nombre completo</label>
                      <input id="appName" className="form-control" required value={appName} onChange={(e)=>setAppName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Correo</label>
                      <input id="appEmail" className="form-control" type="email" required value={appEmail} onChange={(e)=>setAppEmail(e.target.value)} />
                    </div>
                    <button className="btn btn-success">Enviar solicitud</button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Recomendaciones financieras</h6>
                <ul>
                  <li>Elegir plazos razonables reduce la cuota mensual.</li>
                  <li>Comparar tasas y comisiones antes de solicitar crédito.</li>
                  <li>Usar cuentas de ahorro con intereses o CDT para metas cortas.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
