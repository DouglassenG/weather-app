import { WeatherData } from "@/types/weather";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const locationName = data.state
    ? `${data.city}, ${data.state}`
    : `${data.city}, ${data.country}`;

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {locationName}
          </h2>
          <p className="mt-1 text-sm text-white/60">{data.description}</p>
        </div>

        <span className="text-5xl">{data.icon}</span>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-6xl font-bold text-white sm:text-7xl">
          {Math.round(data.temperature)}°
        </span>
        <span className="mb-2 text-lg text-white/50">C</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
          <p className="text-xs text-white/50">Sensação térmica</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {Math.round(data.feels_like)}°C
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
          <p className="text-xs text-white/50">Umidade</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {data.humidity}%
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
          <p className="text-xs text-white/50">Mínima / Máxima</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {Math.round(data.temp_min)}° / {Math.round(data.temp_max)}°
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
          <p className="text-xs text-white/50">Vento</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {data.wind_speed} km/h
          </p>
        </div>
      </div>
    </div>
  );
}