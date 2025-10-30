// src/pages/Closeout.jsx
import React, { useState } from "react";
import { useReport } from "../context/ReportContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Closeout() {
  const { currentReport, finalizeReport } = useReport();
  const nav = useNavigate();

  const [statusz, setStatusz] = useState(currentReport.statusz || "");
  const [osszefoglalo, setOsszefoglalo] = useState(currentReport.osszefoglalo || "");
  const [atvevoNev, setAtvevoNev] = useState(currentReport.atvevoNev || "");

  function handleConfirm() {
    finalizeReport({
      statusz,
      osszefoglalo,
      atvevoNev,
    });
    nav("/preview");
  }

  return (
    <div className="app-shell">
      <header className="lgi-header">
        <div className="lgi-title">Lezárás</div>
        <div className="lgi-badge">LGI</div>
      </header>

      <main className="page">
        <div className="card">
          <div className="label">Fuvar állapota</div>
          <label className="radio-row">
            <input
              type="radio"
              checked={statusz === "rendben"}
              onChange={() => setStatusz("rendben")}
            />
            <span>Rendben, sérülés nélkül</span>
          </label>
          <label className="radio-row" style={{ marginTop: "0.25rem" }}>
            <input
              type="radio"
              checked={statusz === "serules"}
              onChange={() => setStatusz("serules")}
            />
            <span>Sérüléssel érkezett</span>
          </label>
        </div>

        <div className="card">
          <div className="label">Összefoglaló megjegyzés</div>
          <textarea
            placeholder="Pl.: Raklap fóliázása sérült, de darabszám rendben."
            value={osszefoglalo}
            onChange={(e) => setOsszefoglalo(e.target.value)}
          />
        </div>

        <div className="card">
          <div className="label">Átvevő neve</div>
          <input
            className="input"
            placeholder="Ki vette át a szállítmányt?"
            value={atvevoNev}
            onChange={(e) => setAtvevoNev(e.target.value)}
          />
        </div>

        <button
          className="primary-btn"
          onClick={handleConfirm}
          disabled={!statusz || !atvevoNev}
        >
          Riport lezárása és PDF
        </button>

        <div className="footer-hint">LGI • Belső riport</div>
      </main>
    </div>
  );
}
