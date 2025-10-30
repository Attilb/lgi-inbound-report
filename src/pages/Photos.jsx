// src/pages/Photos.jsx
import React, { useRef } from "react";
import { useReport } from "../context/ReportContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Photos() {
  const { currentReport, addPhoto, updatePhotoNote } = useReport();
  const nav = useNavigate();
  const fileRef = useRef(null);

  function handleAddPhotoClick() {
    fileRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    addPhoto({ imageUrl, megjegyzes: "" });
    e.target.value = "";
  }

  return (
    <div className="app-shell">
      <header className="lgi-header">
        <div className="lgi-title">Bizonyító fotók</div>
        <div className="lgi-badge">LGI</div>
      </header>

      <main className="page">
        <button
          className="primary-btn"
          onClick={handleAddPhotoClick}
        >
          + Új fotó felvétele
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        {currentReport.fotos.length === 0 && (
          <div className="card">
            <div className="label">Még nincs fotó</div>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
              Készíts fotót a sérülésről vagy az áru állapotáról.
            </p>
          </div>
        )}

        {currentReport.fotos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.imageUrl} alt="Fotó" />
            <div className="photo-meta">
              <div className="photo-timestamp">{photo.timestamp}</div>
              <textarea
                placeholder="Megjegyzés a képről..."
                value={photo.megjegyzes || ""}
                onChange={(e) => updatePhotoNote(photo.id, e.target.value)}
              />
            </div>
          </div>
        ))}

        <button
          className="primary-btn"
          onClick={() => nav("/closeout")}
          style={{ marginTop: "0.5rem" }}
        >
          Tovább: Lezárás
        </button>

        <div className="footer-hint">Fotók a készüléken maradnak</div>
      </main>
    </div>
  );
}
