"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        setError("Error al subir la imagen");
      }
    } catch {
      setError("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-700">
          <Image src={value} alt="Preview" fill className="object-cover" />
        </div>
      )}
      <div className="flex gap-3 items-center">
        <label className="cursor-pointer px-4 py-2 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 text-sm rounded-xl transition-colors">
          {loading ? "Subiendo..." : value ? "Cambiar imagen" : "Subir imagen"}
          <input type="file" accept="image/*" onChange={handleUpload} disabled={loading} className="hidden" />
        </label>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-gray-600 hover:text-red-400 text-sm transition-colors">
            Quitar imagen
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}