    import { WeatherResponse } from "@/types/weather";

    interface WeatherCardProps {
    data: WeatherResponse;
    }

    export function WeatherCard({ data }: WeatherCardProps) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    return (
        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {data.name}, {data.sys.country}
            </h2>
            <p className="mt-1 text-sm capitalize text-white/60">
                {data.weather[0].description}
            </p>
            </div>

            <img
            src={iconUrl}
            alt={data.weather[0].description}
            width={80}
            height={80}
            className="drop-shadow-lg"
            />
        </div>

        <div className="mt-4 flex items-end gap-2">
            <span className="text-6xl font-bold text-white sm:text-7xl">
            {Math.round(data.main.temp)}°
            </span>
            <span className="mb-2 text-lg text-white/50">C</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/50">Sensação térmica</p>
            <p className="mt-1 text-lg font-semibold text-white">
                {Math.round(data.main.feels_like)}°C
            </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/50">Umidade</p>
            <p className="mt-1 text-lg font-semibold text-white">
                {data.main.humidity}%
            </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/50">Mínima / Máxima</p>
            <p className="mt-1 text-lg font-semibold text-white">
                {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
            </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/50">Vento</p>
            <p className="mt-1 text-lg font-semibold text-white">
                {data.wind.speed} m/s
            </p>
            </div>
        </div>
        </div>
    );
    }