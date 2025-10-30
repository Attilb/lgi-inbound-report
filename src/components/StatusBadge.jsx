import React from "react";

export default function StatusBadge({ statusz }) {
  if (!statusz) return null;

  const isOk = statusz === "rendben";
  const className = isOk
    ? "bg-green-600 text-white"
    : "bg-red-600 text-white";

  const label = isOk ? "RENDBEN" : "SÉRÜLÉS JELZETT";

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${className}`}>
      {label}
    </span>
  );
}
