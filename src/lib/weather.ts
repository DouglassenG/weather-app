import { WeatherData, GeocodingResult } from "@/types/weather";

interface WeatherSuccessResponse {
  type: "weather";
  data: WeatherData;
}

interface MultipleCitiesResponse {
  type: "multiple";
  results: GeocodingResult[];
}

export type WeatherApiResponse = WeatherSuccessResponse | MultipleCitiesResponse;

export async function fetchWeather(city: string): Promise<WeatherApiResponse> {
  const response = await fetch(
    `/api/weather?city=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao buscar previsão do tempo");
  }

  return await response.json();
}

export async function fetchWeatherByCoords(
  location: GeocodingResult
): Promise<WeatherApiResponse> {
  const params = new URLSearchParams({
    lat: String(location.latitude),
    lon: String(location.longitude),
    name: location.name,
    country: location.country_code,
    state: location.admin1 || "",
  });

  const response = await fetch(`/api/weather?${params}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao buscar previsão do tempo");
  }

  return await response.json();
}