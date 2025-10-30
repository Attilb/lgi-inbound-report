import React, { createContext, useContext, useState } from "react";
import { makeReportId } from "../utils/makeReportId.js";
import { getTimestamp } from "../utils/timestamp.js";

const ReportContext = createContext(null);

export function ReportProvider({ children }) {
  const [currentReport, setCurrentReport] = useState(() => ({
    reportId: makeReportId(),
    createdAt: getTimestamp(),
    fuvar: {
      rendszam: "",
      rakodasVezeto: "",
      szallitolevel: "",
      ceg: "",
      telephely: "",
      cmrSzam: "",
    },
    fotos: [],
    statusz: "",
    osszefoglalo: "",
    atvevoNev: "",
    lezartAt: "",
  }));

  function updateFuvarField(field, value) {
    setCurrentReport(prev => ({
      ...prev,
      fuvar: { ...prev.fuvar, [field]: value },
    }));
  }

  function addPhoto({ imageUrl, megjegyzes }) {
    setCurrentReport(prev => ({
      ...prev,
      fotos: [
        ...prev.fotos,
        {
          id: "ph_" + (prev.fotos.length + 1).toString().padStart(3, "0"),
          imageUrl,
          megjegyzes,
          timestamp: getTimestamp(),
        },
      ],
    }));
  }

  function updatePhotoNote(photoId, newText) {
    setCurrentReport(prev => ({
      ...prev,
      fotos: prev.fotos.map(f =>
        f.id === photoId ? { ...f, megjegyzes: newText } : f
      ),
    }));
  }

  function finalizeReport({ statusz, osszefoglalo, atvevoNev }) {
    setCurrentReport(prev => ({
      ...prev,
      statusz,
      osszefoglalo,
      atvevoNev,
      lezartAt: getTimestamp(),
    }));
  }

  return (
    <ReportContext.Provider
      value={{
        currentReport,
        setCurrentReport,
        updateFuvarField,
        addPhoto,
        updatePhotoNote,
        finalizeReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReport must be used inside ReportProvider");
  return ctx;
}