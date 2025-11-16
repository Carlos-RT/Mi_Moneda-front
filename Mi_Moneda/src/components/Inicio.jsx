// src/components/Inicio.jsx
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Inicio() {
  const qSalaryRef = useRef(null);
  const qGoalRef = useRef(null);
  const navigate = useNavigate();

  // establecer valores rápidos iniciales desde localStorage
  useEffect(() => {
    const s = localStorage.getItem("smart_salary");
    const g = localStorage.getItem("smart_goal");
    if (s && qSalaryRef.current) qSalaryRef.current.value = s;
    if (g && qGoalRef.current) qGoalRef.current.value = g;
  }, []);

  function quickStart(e) {
    e && e.preventDefault();
    const s = Number(qSalaryRef.current?.value || 0);
    const g = Number(qGoalRef.current?.value || 0);
    if (!s || !g) return;
    localStorage.setItem("smart_salary", s);
    localStorage.setItem("smart_goal", g);
    localStorage.setItem("smart_months", 6);
    // ir a Mi Meta (ruta /meta) — el componente Meta leerá localStorage
    navigate("/meta");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a
            className="navbar-brand nav-brand"
            href="#"
            onClick={(ev) => { ev.preventDefault(); navigate("/"); }}
          >
            SmartSaving
          </a>
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
        <section id="home" className="view active">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="display-6">SmartSaving</h1>
              <p className="lead">
                Motivación, recomendaciones y planes para ahorrar según tu salario y metas.
                Si tu meta parece inalcanzable, te ayudamos a diseñar alternativas reales y mantener la motivación.
              </p>

              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>Comienza ahora</h5>
                  <p>Ingresa tu salario y la meta para ver un plan instantáneo.</p>
                  <form id="quickForm" onSubmit={quickStart}>
                    <div className="row g-2">
                      <div className="col-md-5">
                        <label className="form-label">Salario (mensual)</label>
                        <input id="qSalary" ref={qSalaryRef} type="number" min="0" className="form-control" placeholder="ej. 2000000" required />
                      </div>
                      <div className="col-md-5">
                        <label className="form-label">Meta (valor total)</label>
                        <input id="qGoal" ref={qGoalRef} type="number" min="0" className="form-control" placeholder="ej. 5000000" required />
                      </div>
                      <div className="col-md-2 d-grid">
                        <label className="form-label invisible">go</label>
                        <button className="btn btn-primary">Ver plan</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="card p-4 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <div className="progress-circle">
                    <div>
                      <div style={{fontSize:18,fontWeight:700}}>Ahorro</div>
                      <div style={{fontSize:12,color:'#6b7280'}}>Con enfoque inteligente</div>
                    </div>
                  </div>
                  <div>
                    <h5>Motivación y seguimiento</h5>
                    <p className="mb-0">Recibirás recomendaciones personalizadas, recordatorios y micro retos para mantener el hábito de ahorrar.</p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <h6>Funcionalidades</h6>
                <ul>
                  <li>Cálculo de plan de ahorro por plazo</li>
                  <li>Asistente virtual que sugiere alternativas</li>
                  <li>Integración simulada con bancos y planes de ahorro</li>
                  <li>Seguimiento de progreso y visualizaciones</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
