import React, { useCallback } from "react";
import Header from "../components/Header.jsx";
import { useReport } from "../context/ReportContext.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { generatePdf } from "../utils/generatePdf.js";

export default function Preview() {
  const { currentReport } = useReport();

  const handleDownloadPdf = useCallback(async () => {
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

  const f = currentReport.fuvar;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header title="Riport kész" />

      <main className="flex-1 p-4 flex flex-col gap-6">
        <section className="bg-gray-100 rounded-xl p-4 flex flex-col gap-2">
          <div className="text-sm text-gray-500">Riport azonosító</div>
          <div className="text-base font-semibold text-gray-900">
            {currentReport.reportId}
          </div>

          <div className="text-xs text-gray-500">
            Létrehozva: {currentReport.createdAt}
          </div>

          <div className="text-xs text-gray-500">
            Lezárva: {currentReport.lezartAt || "—"}
          </div>

          <div className="pt-2">
            <StatusBadge statusz={currentReport.statusz} />
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-4 text-sm text-gray-800 flex flex-col gap-1">
          <Row label="Rendszám" value={f.rendszam} />
          <Row label="Rakodás vezető" value={f.rakodasVezeto} />
          <Row label="Szállítólevél" value={f.szallitolevel} />
          <Row label="Cég" value={f.ceg} />
          <Row label="Telephely" value={f.telephely} />
          <Row label="CMR szám" value={f.cmrSzam} />
          <Row label="Átvevő neve" value={currentReport.atvevoNev} />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-4 text-sm text-gray-800 flex flex-col gap-2">
          <div className="font-medium text-gray-900">Összefoglaló</div>
          <div className="text-gray-800 whitespace-pre-line">
            {currentReport.osszefoglalo || "—"}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
          <div className="text-sm font-medium text-gray-900">
            Fotók ({currentReport.fotos.length} db)
          </div>

          {currentReport.fotos.length === 0 && (
            <div className="text-sm text-gray-500">Nincs fotó.</div>
          )}

          <div className="flex flex-col gap-4">
            {currentReport.fotos.map(photo => (
              <div
                key={photo.id}
                className="border border-gray-300 rounded-lg p-3 flex flex-col gap-2 bg-gray-50"
              >
                <img
                  src={photo.imageUrl}
                  alt="Bizonyító fotó"
                  className="w-full h-auto object-contain rounded bg-black"
                />
                <div className="text-xs text-gray-500">{photo.timestamp}</div>
                <div className="text-sm text-gray-800 whitespace-pre-line">
                  {photo.megjegyzes || "—"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-3">
          <button
            className="w-full bg-red-600 text-white font-semibold text-lg py-4 rounded-xl"
            onClick={handleDownloadPdf}
          >
            PDF letöltése
          </button>

          <button
            className="w-full border border-gray-300 text-gray-800 font-medium text-lg py-4 rounded-xl"
            onClick={handleEmail}
          >
            Küldés emailben
          </button>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col">
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="text-gray-900 text-sm font-medium">{value || "—"}</div>
    </div>
  );
}