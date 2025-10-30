import React, { useRef } from "react";
import Header from "../components/Header.jsx";
import PhotoItem from "../components/PhotoItem.jsx";
import { useReport } from "../context/ReportContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Photos() {
  const { currentReport, addPhoto, updatePhotoNote } = useReport();
  const nav = useNavigate();
  const fileRef = useRef(null);

  function handleAddPhotoClick() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    addPhoto({ imageUrl, megjegyzes: "" });

    e.target.value = "";
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header title="Bizonyító fotók" />

      <main className="flex-1 p-4 flex flex-col gap-4">
        <button
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl text-base"
          onClick={handleAddPhotoClick}
        >
          + Új fotó
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col gap-4">
          {currentReport.fotos.length === 0 && (
            <div className="text-sm text-gray-500">
              Még nincs fotó hozzáadva.
            </div>
          )}

          {currentReport.fotos.map(photo => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              onChangeNote={updatePhotoNote}
            />
          ))}
        </div>

        <button
          className="mt-6 w-full bg-red-600 text-white font-semibold text-lg py-4 rounded-xl"
          onClick={() => nav("/closeout")}
        >
          Tovább: Lezárás
        </button>
      </main>
    </div>
  );
}