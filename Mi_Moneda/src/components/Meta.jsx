import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fondometa from "Mi_Moneda\public\imagenes\Fondo_meta.jpg";

function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
}

export default function Meta() {
  const navigate = useNavigate();

  // Estados base
  const [salary, setSalary] = useState("");
  const [months, setMonths] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  // Resultados
  const [planVisible, setPlanVisible] = useState(false);
  const [neededPerMonth, setNeededPerMonth] = useState(0);
  const [maxSavePerMonth, setMaxSavePerMonth] = useState(0);
  const [feasible, setFeasible] = useState(null);
  const [resultSummary, setResultSummary] = useState([]);

  // Progreso
  const [progress, setProgress] = useState(null);

  // Modal propio
  const [modalInfo, setModalInfo] = useState(null);

  // Cargar localStorage al iniciar
  useEffect(() => {
    const s = localStorage.getItem("smart_salary");
    const g = localStorage.getItem("smart_goal");
    const m = localStorage.getItem("smart_months");

    if (s) setSalary(s);
    if (g) setGoalAmount(g);
    if (m) setMonths(m);

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

    const plan = {
      salary: s,
      months: mo,
      goal: g,
      neededPerMonth: needed,
      maxSavePerMonth: maxSave,
    };

    // Guardar
    localStorage.setItem("smart_plan", JSON.stringify(plan));

    setNeededPerMonth(needed);
    setMaxSavePerMonth(Math.round(maxSave));
    setFeasible(isFeasible);
    setPlanVisible(true);

    setResultSummary([
      { label: "Monto objetivo", value: `$${numberWithCommas(g)}` },
      { label: "Plazo", value: `${mo} meses` },
      { label: "Ahorro requerido mensual", value: `$${numberWithCommas(needed)}` },
      {
        label: "Máximo recomendado por mes (50% salario)",
        value: `$${numberWithCommas(Math.round(maxSave))}`,
      },
    ]);

    if (isFeasible) {
      saveProgress(plan, 0);
    }
  }

  function showAlternatives(plan) {
    return [
      {
        title: `Extender plazo a ${plan.months * 2} meses`,
        detail: `Reducirías el pago mensual a $${numberWithCommas(
          Math.ceil(plan.goal / (plan.months * 2))
        )}`,
      },
      {
        title: "Dividir la meta en metas parciales",
        detail:
          "Establece metas más pequeñas para generar hábito y mejorar tus probabilidades de éxito.",
      },
      {
        title: "Explorar planes bancarios o microcréditos",
        detail:
          "Podrías encontrar opciones con plazos más largos o ahorro programado.",
      },
    ];
  }

  function openSuggestion(title, detail) {
    setModalInfo({ title, detail });
  }

  function renderRecommendations(plan, feasibleFlag) {
    if (feasibleFlag) {
      return (
        <div className="card">
          <h4>Recomendaciones</h4>
          <ul className="list" style={{ marginTop: "10px" }}>
            <li>
              Automatiza la transferencia mensual de $
              {numberWithCommas(plan.neededPerMonth)}
            </li>
            <li>Crea un fondo de emergencia.</li>
            <li>Revisa gastos variables y elimina suscripciones innecesarias.</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="card">
          <h4>Acciones recomendadas</h4>
          <ul className="list" style={{ marginTop: "10px" }}>
            <li>Habla con un asesor o asistente virtual.</li>
            <li>Divide la meta o extiende el plazo.</li>
            <li>Consulta la sección de Bancos para más alternativas.</li>
          </ul>
        </div>
      );
    }
  }

  function saveProgress(plan, currentAmount) {
    const p = {
      plan,
      currentAmount,
      updated: new Date().toISOString(),
    };

    localStorage.setItem("smart_progress", JSON.stringify(p));
    loadSavedProgress();
  }

  function loadSavedProgress() {
    const p = JSON.parse(localStorage.getItem("smart_progress") || "null");
    setProgress(p);
  }

  function handleLoadExample() {
    setSalary(2000000);
    setGoalAmount(8000000);
    setMonths(12);
  }

  return (
    <>
      {/* NAV */}
      <nav className="navbar">
        <div className="container">
          <span className="nav-brand" onClick={() => navigate("/")}>
            SmartSaving
          </span>

          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/meta">Mi Meta</Link>
            </li>
            <li>
              <Link to="/bancos">Bancos</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div
        style={{
          backgroundImage: `url(${fondometa})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          marginTop: "0px",
          paddingTop: "100px",
        }}
      >
        <main className="container section">
          <div className="row">
            {/* COLUMNA IZQUIERDA */}
            <div className="col-7">
              <div className="card">
                <h3>Define tu meta</h3>

                <form onSubmit={computePlan} style={{ marginTop: "15px" }}>
                  <label className="form-label">Salario mensual (COP)</label>
                  <input
                    className="input"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />

                  <label className="form-label">Meses para lograr la meta</label>
                  <input
                    className="input"
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                  />

                  <label className="form-label">Monto objetivo (COP)</label>
                  <input
                    className="input"
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                  />

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn btn-primary">Calcular plan</button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleLoadExample}
                    >
                      Ejemplo
                    </button>
                  </div>
                </form>
              </div>

              {/* RESULTADO */}
              {planVisible && (
                <div className="card">
                  <h3>Plan sugerido</h3>

                  {resultSummary.map((r) => (
                    <p key={r.label}>
                      <strong>{r.label}:</strong> {r.value}
                    </p>
                  ))}

                  {/* META FACTIBLE */}
                  {feasible ? (
                    <div className="alert-success">
                      <div className="alert-title">Tu meta es alcanzable</div>
                      <p>
                        Estás dentro de un rango saludable de ahorro. Mantén
                        disciplina y sigue estas recomendaciones:
                      </p>

                      <ul className="list" style={{ marginTop: "10px" }}>
                        <li>
                          Pago mensual sugerido: $
                          {numberWithCommas(neededPerMonth)}
                        </li>
                        <li>Automatiza el pago mensual.</li>
                        <li>
                          Reduce gastos variables y crea un fondo de emergencia.
                        </li>
                      </ul>
                    </div>
                  ) : (
                    /* META NO FACTIBLE */
                    <div className="alert-warning">
                      <div className="alert-title">
                        Tu meta es difícil de alcanzar
                      </div>
                      <p>
                        Con los datos actuales, la cuota requerida supera lo
                        recomendado. Te sugerimos evaluar estas
                        alternativas:
                      </p>

                      {showAlternatives({
                        months: Number(months),
                        goal: Number(goalAmount),
                      }).map((alt) => (
                        <div
                          key={alt.title}
                          className="card"
                          style={{ marginTop: "10px" }}
                        >
                          <strong>{alt.title}</strong>
                          <p style={{ marginTop: "5px" }}>{alt.detail}</p>

                          {/* 🔥 BOTÓN MODIFICADO AQUÍ */}
                          {alt.title ===
                          "Explorar planes bancarios o microcréditos" ? (
                            <button
                              className="btn btn-outline"
                              onClick={() => navigate("/bancos")}
                            >
                              Revisa nuestros bancos
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline"
                              onClick={() =>
                                openSuggestion(alt.title, alt.detail)
                              }
                            >
                              Ver detalles
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* RECOMENDACIONES */}
              {planVisible &&
                renderRecommendations({ neededPerMonth }, feasible)}
            </div>

            {/* COLUMNA DERECHA */}
            <div className="col-5">
              <div className="card">
                <h3>Progreso</h3>

                {progress ? (
                  <>
                    <p>
                      Meta:{" "}
                      <strong>
                        ${numberWithCommas(progress.plan.goal)}
                      </strong>{" "}
                      en {progress.plan.months} meses
                    </p>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              (progress.currentAmount /
                                progress.plan.goal) *
                                100
                            )
                          )}%`,
                        }}
                      >
                        {Math.min(
                          100,
                          Math.round(
                            (progress.currentAmount /
                              progress.plan.goal) *
                              100
                          )
                        )}
                        %
                      </div>
                    </div>

                    <p
                      style={{
                        marginTop: "8px",
                        fontSize: "0.9rem",
                        color: "#666",
                      }}
                    >
                      Última actualización:{" "}
                      {new Date(progress.updated).toLocaleString()}
                    </p>
                  </>
                ) : (
                  <p style={{ color: "#777" }}>
                    Aún no tienes progreso registrado.
                  </p>
                )}
              </div>

              <div className="card">
                <h3>Consejos rápidos</h3>
                <ul className="list" style={{ marginTop: "10px" }}>
                  <li>Automatiza tus transferencias.</li>
                  <li>Reduce gastos 10% este mes.</li>
                  <li>Revisa suscripciones inactivas.</li>
                </ul>
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
          © {new Date().getFullYear()} SmartSaving — Todos los derechos
          reservados.
        </p>
      </footer>

      {/* MODAL PERSONALIZADO */}
      {modalInfo && (
        <div
          className="modal-overlay"
          onClick={() => setModalInfo(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>{modalInfo.title}</h4>
            <p>{modalInfo.detail}</p>

            <button
              className="btn btn-primary"
              onClick={() => setModalInfo(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
