    import { WeatherData } from "@/types/weather";

    export async function fetchWeather(city: string): Promise<WeatherData> {
    const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao buscar previsão do tempo");
    }

    const data: WeatherData = await response.json();
    return data;
    }