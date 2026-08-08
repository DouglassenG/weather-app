    import { WeatherResponse } from "@/types/weather";

    interface WeatherCardProps {
    data: WeatherResponse;
    }

    export function WeatherCard({ data }: WeatherCardProps) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-2xl font-bold text-gray-900">
                {data.name}, {data.sys.country}
            </h2>
            <p className="text-sm capitalize text-gray-500">
                {data.weather[0].description}
            </p>
            </div>

            <img
            src={iconUrl}
            alt={data.weather[0].description}
            width={80}
            height={80}
            />
        </div>

        <div className="mt-4 flex items-end gap-2">
            <span className="text-6xl font-bold text-gray-900">
            {Math.round(data.main.temp)}°
            </span>
            <span className="mb-2 text-lg text-gray-500">C</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Sensação térmica</p>
            <p className="text-lg font-semibold text-gray-900">
                {Math.round(data.main.feels_like)}°C
            </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Umidade</p>
            <p className="text-lg font-semibold text-gray-900">
                {data.main.humidity}%
            </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Mínima / Máxima</p>
            <p className="text-lg font-semibold text-gray-900">
                {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
            </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Vento</p>
            <p className="text-lg font-semibold text-gray-900">
                {data.wind.speed} m/s
            </p>
            </div>
        </div>
        </div>
    );
    }