import React from "react";

export default function Header({ title }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <div className="text-xs font-bold text-red-600">
        LGI
      </div>
    </header>
  );
}
