"use client";

import { useState } from "react";
import { SearchBar } from "@/components/weather/SearchBar";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { fetchWeather } from "@/lib/weather";
import { WeatherResponse } from "@/types/weather";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(city: string) {
    setIsLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado ao buscar previsão do tempo");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Previsão do Tempo
        </h1>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {weatherData && (
          <div className="mt-6">
            <WeatherCard data={weatherData} />
          </div>
        )}
      </div>
    </main>
  );
}