// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="app-shell">
      <header className="lgi-header">
        <div className="lgi-title">Átvételi Riport</div>
        <div className="lgi-badge">LGI</div>
      </header>

      <main className="page">
        <div className="card" style={{ marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", marginBottom: "0.35rem" }}>
            Új átvételi riport
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            Kamion beérkezett? Készíts fotós dokumentációt és zárd le PDF-ben.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => nav("/new-report")}
        >
          Új riport indítása
        </button>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="label">Mentett riportok</div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            Ez az MVP nem tartalmaz riportlistát. Később ide kerül.
          </p>
        </div>

        <div className="footer-hint">LGI • Receiving • v1.0</div>
      </main>
    </div>
  );
}
