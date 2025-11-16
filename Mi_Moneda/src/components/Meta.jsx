// src/components/Meta.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
}

export default function Meta() {
  const navigate = useNavigate();

  // estados del formulario
  const [salary, setSalary] = useState("");
  const [months, setMonths] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  // estados de resultado
  const [planVisible, setPlanVisible] = useState(false);
  const [neededPerMonth, setNeededPerMonth] = useState(0);
  const [maxSavePerMonth, setMaxSavePerMonth] = useState(0);
  const [feasible, setFeasible] = useState(null);
  const [resultSummary, setResultSummary] = useState([]);

  // progreso (desde localStorage)
  const [progress, setProgress] = useState(null);

  // referencia al modal para sugerencias
  const suggestModalRef = useRef(null);

  // cargar valores iniciales desde localStorage cuando el componente se monta
  useEffect(() => {
    const s = localStorage.getItem("smart_salary");
    const g = localStorage.getItem("smart_goal");
    const m = localStorage.getItem("smart_months");
    if (s) setSalary(s);
    if (g) setGoalAmount(g);
    if (m) setMonths(m);

    // cargar cualquier plan/progreso guardado
    loadSavedProgress();
  }, []);

  function computePlan(e) {
    e && e.preventDefault();
    const s = Number(salary);
    const mo = Number(months);
    const g = Number(goalAmount);
    if (!s || !mo || !g) return;

    const disposableRatio = 0.5;
    const maxSave = s * disposableRatio;
    const needed = Math.ceil(g / mo);
    const isFeasible = needed <= maxSave;

    // guardar plan en localStorage
    const plan = { salary: s, months: mo, goal: g, neededPerMonth: needed, maxSavePerMonth: maxSave };
    localStorage.setItem("smart_plan", JSON.stringify(plan));

    // establecer estados para renderizar
    setNeededPerMonth(needed);
    setMaxSavePerMonth(Math.round(maxSave));
    setFeasible(isFeasible);
    setPlanVisible(true);

    const summary = [
      { label: "Monto objetivo", value: `$${numberWithCommas(g)}` },
      { label: "Plazo", value: `${mo} meses` },
      { label: "Ahorro requerido por mes", value: `$${numberWithCommas(needed)}` },
      { label: "Máximo recomendado por mes (50% del salario)", value: `$${numberWithCommas(Math.round(maxSave))}` },
    ];
    setResultSummary(summary);

    // crear una entrada de progreso simulada si es factible (mismo comportamiento que el original)
    if (isFeasible) {
      saveProgress(plan, 0);
    } else {
      // si no es factible, proporcionar alternativas en el marcado a continuación (estado usado)
    }
  }

  function showAlternatives(plan) {
    // devuelve un arreglo de objetos alternativas
    return [
      { title: `Extiende plazo a ${plan.months * 2} meses`, detail: `Reducirías la cuota mensual a $${numberWithCommas(Math.ceil(plan.goal / (plan.months * 2)))}` },
      { title: `Divide la meta en metas parciales`, detail: `Establece metas más pequeñas (ej: ahorrar 25% de la meta en los primeros X meses) para generar hábito y confianza.` },
      { title: `Explorar planes de ahorro / microcréditos`, detail: `Revisa opciones que permitan financiamiento con plazos más largos o ahorro programado con interés.` }
    ];
  }

  function openSuggestion(title, detail) {
    // llenar cuerpo del modal y mostrar modal bootstrap
    const body = document.getElementById("suggestBody");
    if (body) body.innerHTML = `<h6>${title}</h6><p>${detail}</p>`;
    try {
      // window.bootstrap está presente si cargaste el paquete de Bootstrap
      if (window.bootstrap && suggestModalRef.current) {
        const bsModal = new window.bootstrap.Modal(suggestModalRef.current);
        bsModal.show();
      }
    } catch (err) {
      console.warn("No se pudo abrir modal bootstrap", err);
    }
  }

  function renderRecommendations(plan, feasibleFlag) {
    // devuelve un arreglo de elementos JSX (los renderizaremos abajo)
    if (feasibleFlag) {
      return (
        <div className="mt-3">
          <h6>Recomendaciones personalizadas</h6>
          <ul>
            <li>Automatizar la transferencia mensual de {`$${numberWithCommas(plan.neededPerMonth)}`}</li>
            <li>Crear un fondo de emergencia equivalente a 1 mes de salario.</li>
            <li>Revisar suscripciones y gastos innecesarios.</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="mt-3">
          <h6>Acciones que puedes tomar</h6>
          <ul>
            <li>Habla con nuestro asistente para generar un plan alternativo.</li>
            <li>Considera extender el plazo o dividir la meta.</li>
            <li>Explora planes bancarios disponibles en la sección "Bancos".</li>
          </ul>
        </div>
      );
    }
  }

  // guardar / cargar progreso
  function saveProgress(plan, currentAmount = 0) {
    const p = { plan, currentAmount, updated: new Date().toISOString() };
    localStorage.setItem("smart_progress", JSON.stringify(p));
    loadSavedProgress();
  }

  function loadSavedProgress() {
    const p = JSON.parse(localStorage.getItem("smart_progress") || "null");
    if (!p) {
      setProgress(null);
      return;
    }
    setProgress(p);
  }

  function handleLoadExample() {
    setSalary(2000000);
    setGoalAmount(8000000);
    setMonths(12);
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
        <section id="dashboard" className="view active">
          <div className="row">
            <div className="col-lg-7">
              <div className="card shadow-sm mb-3">
                <div className="card-body">
                  <h5>Define tu meta</h5>
                  <form id="goalForm" onSubmit={computePlan}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Salario mensual (COP)</label>
                        <input value={salary} onChange={(e) => setSalary(e.target.value)} id="salary" type="number" min="0" className="form-control" placeholder="2000000" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">¿Meta en cuánto tiempo?</label>
                        <div className="input-group">
                          <input value={months} onChange={(e) => setMonths(e.target.value)} id="months" type="number" min="1" className="form-control" placeholder="meses" required />
                          <span className="input-group-text">meses</span>
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label">Monto objetivo (COP)</label>
                        <input value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} id="goalAmount" type="number" min="0" className="form-control" placeholder="5000000" required />
                      </div>

                      <div className="col-12 d-flex gap-2">
                        <button className="btn btn-primary">Calcular plan</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleLoadExample}>Ejemplo</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {planVisible && (
                <div id="planResult" className="card shadow-sm">
                  <div className="card-body">
                    <h5>Plan sugerido</h5>

                    <div>
                      {resultSummary.map((r) => (
                        <p key={r.label}><strong>{r.label}:</strong> {r.value}</p>
                      ))}
                    </div>

                    {feasible ? (
                      <div className="alert alert-success">¡Tu meta parece alcanzable con disciplina! Aquí hay un plan sugerido:
                        <ol>
                          <li>Abono fijo mensual: {`$${numberWithCommas(neededPerMonth)}`}</li>
                          <li>Automatiza transferencia el día de tu salario.</li>
                          <li>Revisa gastos variables y crea un fondo de emergencia.</li>
                        </ol>
                      </div>
                    ) : (
                      <div>
                        <div className="alert alert-warning">Tu meta actual se clasifica como <strong>económicamente inalcanzable</strong> según las normas iniciales. No te preocupes: aquí tienes alternativas.</div>

                        <ul className="list-group">
                          {showAlternatives({ months: Number(months), goal: Number(goalAmount) }).map((a) => (
                            <li key={a.title} className="list-group-item">
                              <strong>{a.title}</strong>
                              <div>{a.detail}</div>
                              <div className="mt-2">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => openSuggestion(a.title, a.detail)}>Más detalles</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div id="recommendations">
                {planVisible && renderRecommendations({ neededPerMonth }, feasible)}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card shadow-sm p-3 mb-3">
                <h6>Progreso</h6>
                <div id="progressArea">
                  {progress ? (
                    <>
                      <div><strong>{`$${numberWithCommas(progress.plan.goal)}`}</strong> objetivo en {progress.plan.months} meses</div>
                      <div className="progress mt-2" style={{height:18}}>
                        <div className="progress-bar" role="progressbar" style={{width: `${Math.min(100, Math.round((progress.currentAmount / progress.plan.goal) * 100))}%`}}>
                          {Math.min(100, Math.round((progress.currentAmount / progress.plan.goal) * 100))}%
                        </div>
                      </div>
                      <div className="mt-2 small text-muted">Última actualización: {new Date(progress.updated).toLocaleString()}</div>
                    </>
                  ) : (
                    <p className="text-muted">Añade una meta para ver seguimiento.</p>
                  )}
                </div>
              </div>

              <div className="card shadow-sm p-3">
                <h6>Consejos rápidos</h6>
                <ul id="quickTips">
                  <li>Automatiza una transferencia mensual al inicio de mes.</li>
                  <li>Reduce gastos variables 10% y redirígelos a la meta.</li>
                  <li>Revisa suscripciones y cancela las que no uses.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <div className="modal fade" id="suggestModal" tabIndex="-1" aria-hidden="true" ref={suggestModalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sugerencias para tu meta</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" id="suggestBody"></div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
