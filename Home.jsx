import React from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header title="Átvételi Riport" />

      <main className="flex-1 p-4 flex flex-col gap-4">
        <button
          className="w-full bg-red-600 text-white font-semibold text-lg py-4 rounded-xl"
          onClick={() => nav("/new-report")}
        >
          Új riport indítása
        </button>

        <button
          className="w-full border border-gray-300 text-gray-800 font-medium text-lg py-4 rounded-xl"
          onClick={() => nav("/reports")}
        >
          Mentett riportok (később)
        </button>

        <div className="text-xs text-gray-400 text-center mt-8">
          Verzió: v1.0 (online)
        </div>
      </main>
    </div>
  );
}