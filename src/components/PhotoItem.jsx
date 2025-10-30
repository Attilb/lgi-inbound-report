import React from "react";

export default function PhotoItem({ photo, onChangeNote }) {
  return (
    <div className="bg-gray-100 rounded-xl p-3 flex flex-col gap-2">
      <div className="w-full rounded overflow-hidden bg-black">
        {photo.imageUrl ? (
          <img
            src={photo.imageUrl}
            alt="Bizonyító fotó"
            className="w-full h-auto object-contain"
          />
        ) : (
          <div className="text-white text-center text-sm py-8">
            (nincs kép)
          </div>
        )}
      </div>

      <div className="text-xs text-gray-600">
        {photo.timestamp}
      </div>

      <textarea
        className="w-full text-sm p-2 rounded border border-gray-300"
        placeholder="Megjegyzés a képről..."
        value={photo.megjegyzes || ""}
        onChange={(e) => onChangeNote(photo.id, e.target.value)}
      />
    </div>
  );
}
