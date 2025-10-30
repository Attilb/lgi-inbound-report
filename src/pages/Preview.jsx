// src/pages/Preview.jsx
import React, { useCallback } from "react";
import { useReport } from "../context/ReportContext.jsx";
import { generatePdf } from "../utils/generatePdf.js";

export default function Preview() {
  const { currentReport } = useReport();
  const f = currentReport.fuvar;

  const handlePdf = useCallback(async () => {
    await generatePdf(currentReport);
  }, [currentReport]);

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(
      `${currentReport.reportId} - Beérkezési riport`
    );
    const body = encodeURIComponent(
      `Szállítmány átvételi riport csatolva.\nRiport azonosító: ${currentReport.reportId}`
    );
    window.location.href = `mailto:lgi.receiving.audit@gmail.com?subject=${subject}&body=${body}`;
  }, [currentReport]);

  return (
    <div className="app-shell">
      <header className="lgi-header">
        <div className="lgi-title">Riport kész</div>
        <div className="lgi-badge">LGI</div>
      </header>

      <main className="page">
        <div className="card">
          <div className="label">Riport azonosító</div>
          <div style={{ fontWeight: 600 }}>{currentReport.reportId}</div>
          <div className="label" style={{ marginTop: "0.5rem" }}>
            Létrehozva
          </div>
          <div>{currentReport.createdAt}</div>
          <div className="label" style={{ marginTop: "0.5rem" }}>
            Lezárva
          </div>
          <div>{currentReport.lezartAt || "—"}</div>
          <div style={{ marginTop: "0.75rem" }}>
            {currentReport.statusz === "rendben" ? (
              <span className="status-pill-ok">RENDBEN</span>
            ) : currentReport.statusz === "serules" ? (
              <span className="status-pill-bad">SÉRÜLÉS JELZETT</span>
            ) : null}
          </div>
        </div>

        <div className="card">
          <div className="label">Fuvar adatai</div>
          <InfoRow label="Rendszám" value={f.rendszam} />
          <InfoRow label="Rakodás vezető" value={f.rakodasVezeto} />
          <InfoRow label="Szállítólevél" value={f.szallitolevel} />
          <InfoRow label="Cég" value={f.ceg} />
          <InfoRow label="Telephely" value={f.telephely} />
          <InfoRow label="CMR szám" value={f.cmrSzam} />
          <InfoRow label="Átvevő neve" value={currentReport.atvevoNev} />
        </div>

        <div className="card">
          <div className="label">Összefoglaló</div>
          <div>{currentReport.osszefoglalo || "—"}</div>
        </div>

        <button className="primary-btn" onClick={handlePdf}>
          PDF letöltése
        </button>
        <button
          className="primary-btn"
          onClick={handleEmail}
          style={{ background: "#fff", color: "var(--text)", border: "1px solid rgba(0,0,0,0.05)" }}
        >
          Küldés emailben
        </button>
      </main>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ marginBottom: "0.35rem" }}>
      <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{label}</div>
      <div style={{ fontSize: "0.8rem" }}>{value || "—"}</div>
    </div>
  );
}
