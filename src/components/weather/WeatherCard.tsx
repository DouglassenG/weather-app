import { WeatherData } from "@/types/weather";
import {
  Thermometer,
  Droplets,
  Wind,
  ArrowDown,
  ArrowUp,
  CloudRain,
} from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const locationName = data.state
    ? `${data.city}, ${data.state}`
    : `${data.city}, ${data.country}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/80 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {locationName}
          </h2>
          <p className="mt-1 text-sm text-white/50">{data.description}</p>
        </div>

        <span className="text-5xl drop-shadow-md">{data.icon}</span>
      </div>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-7xl font-extralight tracking-tighter text-white">
          {Math.round(data.temperature)}°
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors duration-300 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
            <Thermometer size={18} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">
              Sensação
            </p>
            <p className="text-base font-medium text-white">
              {Math.round(data.feels_like)}°C
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors duration-300 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
            <Droplets size={18} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">
              Umidade
            </p>
            <p className="text-base font-medium text-white">
              {data.humidity}%
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors duration-300 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <div className="flex items-center gap-0.5">
              <ArrowDown size={14} />
              <ArrowUp size={14} />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">
              Mín / Máx
            </p>
            <p className="text-base font-medium text-white">
              {Math.round(data.temp_min)}° / {Math.round(data.temp_max)}°
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors duration-300 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Wind size={18} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">
              Vento
            </p>
            <p className="text-base font-medium text-white">
              {data.wind_speed} km/h
            </p>
          </div>
        </div>
        <div className="group col-span-2 flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors duration-300 hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
            <CloudRain size={18} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/40">
              Probabilidade de chuva
            </p>
            <p className="text-base font-medium text-white">
              {data.precipitation_probability}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}