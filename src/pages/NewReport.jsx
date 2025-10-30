// src/pages/NewReport.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../context/ReportContext.jsx";

export default function NewReport() {
  const { currentReport, updateFuvarField } = useReport();
  const nav = useNavigate();
  const f = currentReport.fuvar;

  return (
    <div className="app-shell">
      <header className="lgi-header">
        <div className="lgi-title">Fuvar adatai</div>
        <div className="lgi-badge">LGI</div>
      </header>

      <main className="page">
        <div className="card">
          <div className="label">Rendszám</div>
          <input
            className="input"
            value={f.rendszam}
            onChange={(e) => updateFuvarField("rendszam", e.target.value)}
            placeholder="Pl.: ABC-123"
          />
        </div>

        <div className="card">
          <div className="label">Rakodás vezető</div>
          <input
            className="input"
            value={f.rakodasVezeto}
            onChange={(e) => updateFuvarField("rakodasVezeto", e.target.value)}
            placeholder="Ki volt jelen az átvételnél?"
          />
        </div>

        <div className="card">
          <div className="label">Szállítólevél</div>
          <input
            className="input"
            value={f.szallitolevel}
            onChange={(e) => updateFuvarField("szallitolevel", e.target.value)}
            placeholder="Szállítólevél száma"
          />
        </div>

        <div className="card">
          <div className="label">Cég</div>
          <input
            className="input"
            value={f.ceg}
            onChange={(e) => updateFuvarField("ceg", e.target.value)}
            placeholder="Ki szállított?"
          />
        </div>

        <div className="card">
          <div className="label">Telephely</div>
          <input
            className="input"
            value={f.telephely}
            onChange={(e) => updateFuvarField("telephely", e.target.value)}
            placeholder="Pl.: Páty M1 Raktár #4"
          />
        </div>

        <div className="card">
          <div className="label">CMR szám</div>
          <input
            className="input"
            value={f.cmrSzam}
            onChange={(e) => updateFuvarField("cmrSzam", e.target.value)}
            placeholder="CMR azonosító"
          />
        </div>

        <div className="card">
          <div className="label">Riport azonosító</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text)" }}>
            {currentReport.reportId}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
            Létrehozva: {currentReport.createdAt}
          </div>
        </div>

        <button
          className="primary-btn"
          onClick={() => nav("/photos")}
        >
          Tovább: Fotók
        </button>

        <div className="footer-hint">Minden mező diktálható is</div>
      </main>
    </div>
  );
}
