import React, { useState } from "react";
import Header from "../components/Header.jsx";
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header title="Lezárás" />

      <main className="flex-1 p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">
            Fuvar állapota
          </label>

          <label className="flex items-center gap-2 text-base text-gray-900">
            <input
              type="radio"
              checked={statusz === "rendben"}
              onChange={() => setStatusz("rendben")}
            />
            <span>Rendben, sérülés nélkül</span>
          </label>

          <label className="flex items-center gap-2 text-base text-gray-900">
            <input
              type="radio"
              checked={statusz === "serules"}
              onChange={() => setStatusz("serules")}
            />
            <span>Sérüléssel érkezett</span>
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">
            Összefoglaló megjegyzés
          </label>
          <textarea
            className="border border-gray-300 rounded-lg p-3 text-base text-gray-900 min-h-[100px]"
            placeholder="Pl.: Raklap fóliázása sérült, de darabszám rendben."
            value={osszefoglalo}
            onChange={e => setOsszefoglalo(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">
            Átvevő neve
          </label>
          <input
            className="border border-gray-300 rounded-lg p-3 text-base text-gray-900"
            placeholder="Ki vette át a szállítmányt?"
            value={atvevoNev}
            onChange={e => setAtvevoNev(e.target.value)}
          />
        </div>

        <button
          className="mt-6 w-full bg-red-600 text-white font-semibold text-lg py-4 rounded-xl disabled:bg-gray-400 disabled:text-gray-100"
          disabled={!statusz || !atvevoNev}
          onClick={handleConfirm}
        >
          Riport lezárása és PDF
        </button>
      </main>
    </div>
  );
}