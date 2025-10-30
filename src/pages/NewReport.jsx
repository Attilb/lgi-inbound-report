import React from "react";
import Header from "../components/Header.jsx";
import { useReport } from "../context/ReportContext.jsx";
import { useNavigate } from "react-router-dom";

export default function NewReport() {
  const { currentReport, updateFuvarField } = useReport();
  const nav = useNavigate();

  const fuvar = currentReport.fuvar;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header title="Fuvar adatai" />

      <main className="flex-1 p-4 flex flex-col gap-4">
        <InputRow
          label="Rendszám"
          value={fuvar.rendszam}
          onChange={v => updateFuvarField("rendszam", v)}
        />
        <InputRow
          label="Rakodás vezető"
          value={fuvar.rakodasVezeto}
          onChange={v => updateFuvarField("rakodasVezeto", v)}
        />
        <InputRow
          label="Szállítólevél"
          value={fuvar.szallitolevel}
          onChange={v => updateFuvarField("szallitolevel", v)}
        />
        <InputRow
          label="Cég"
          value={fuvar.ceg}
          onChange={v => updateFuvarField("ceg", v)}
        />
        <InputRow
          label="Telephely"
          value={fuvar.telephely}
          onChange={v => updateFuvarField("telephely", v)}
        />
        <InputRow
          label="CMR szám"
          value={fuvar.cmrSzam}
          onChange={v => updateFuvarField("cmrSzam", v)}
        />

        <ReadOnlyRow label="Riport azonosító" value={currentReport.reportId} />
        <ReadOnlyRow label="Létrehozva" value={currentReport.createdAt} />

        <button
          className="mt-6 w-full bg-red-600 text-white font-semibold text-lg py-4 rounded-xl"
          onClick={() => nav("/photos")}
        >
          Tovább: Fotók
        </button>
      </main>
    </div>
  );
}

function InputRow({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <input
        className="border border-gray-300 rounded-lg p-3 text-base text-gray-900"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={label + "..."}
      />
    </label>
  );
}

function ReadOnlyRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <div className="border border-gray-200 rounded-lg p-3 text-base text-gray-500 bg-gray-50">
        {value}
      </div>
    </div>
  );
}
