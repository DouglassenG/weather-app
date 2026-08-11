"use client";

import { useState } from "react";
import { SearchBar } from "@/components/weather/SearchBar";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { CitySelect } from "@/components/weather/CitySelect";
import { fetchWeather, fetchWeatherByCoords } from "@/lib/weather";
import { WeatherData, GeocodingResult } from "@/types/weather";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cities, setCities] = useState<GeocodingResult[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function resetStates() {
    setError("");
    setWeatherData(null);
    setCities([]);
  }

  async function handleSearch(city: string) {
    setIsLoading(true);
    resetStates();

    try {
      const result = await fetchWeather(city);

      if (result.type === "multiple") {
        setCities(result.results);
      } else {
        setWeatherData(result.data);
      }
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

  async function handleCitySelect(location: GeocodingResult) {
    setIsLoading(true);
    setCities([]);
    setError("");

    try {
      const result = await fetchWeatherByCoords(location);

      if (result.type === "weather") {
        setWeatherData(result.data);
      }
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
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/background_page.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-10 w-full max-w-md">
        <div className="animate-fade-in-up animate-border-glow rounded-2xl border-2 bg-black/40 p-8 text-center backdrop-blur-lg">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            Previsão do Tempo
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Consulte o clima de qualquer cidade do mundo
          </p>

          <div className="animate-fade-in-up animation-delay-200 mt-6">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {error && (
          <div
            className="animate-scale-in mt-4 rounded-xl border border-red-400/30 bg-red-900/60 px-4 py-3 text-sm text-white backdrop-blur-md"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            {error}
          </div>
        )}

        {cities.length > 0 && (
          <div className="animate-scale-in">
            <CitySelect cities={cities} onSelect={handleCitySelect} />
          </div>
        )}

        {weatherData && (
          <div className="animate-fade-in-up animation-delay-400 mt-6">
            <WeatherCard data={weatherData} />
          </div>
        )}
      </div>
    </main>
  );
}