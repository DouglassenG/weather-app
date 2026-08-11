"use client";

import { GeocodingResult } from "@/types/weather";

interface CitySelectProps {
  cities: GeocodingResult[];
  onSelect: (city: GeocodingResult) => void;
}

export function CitySelect({ cities, onSelect }: CitySelectProps) {
  return (
    <div className="mt-4 rounded-xl border border-white/20 bg-black/40 p-4 backdrop-blur-md">
      <p className="mb-3 text-sm text-white/70">
        Encontramos mais de uma cidade. Qual você quis dizer?
      </p>

      <div className="flex flex-col gap-2">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelect(city)}
            className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-left text-sm text-white transition-all duration-200 hover:bg-white/20"
          >
            <span className="font-semibold">{city.name}</span>
            {city.admin1 && (
              <span className="text-white/60">, {city.admin1}</span>
            )}
            <span className="text-white/60"> — {city.country}</span>
          </button>
        ))}
      </div>
    </div>
  );
}