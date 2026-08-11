"use client";

import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [city, setCity] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) return;

    onSearch(trimmedCity);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Ex: Lajeado, RS"
          disabled={isLoading}
          className="flex-1 rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/50 shadow-inner backdrop-blur-sm transition-all duration-300 focus:border-white/60 focus:bg-white/30 focus:outline-none disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-500/30 active:scale-95 disabled:opacity-50 disabled:hover:bg-sky-500"
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      <p className="mt-2 text-xs text-white/40">
        Digite a cidade ou cidade, estado. Ex: São Paulo, SP
      </p>
    </div>
  );
}