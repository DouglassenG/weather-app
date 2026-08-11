    import { NextRequest, NextResponse } from "next/server";
    import {
    GeocodingResponse,
    OpenMeteoResponse,
    WeatherData,
    } from "@/types/weather";

    const WMO_CODES: Record<number, { description: string; icon: string }> = {
    0: { description: "Céu limpo", icon: "☀️" },
    1: { description: "Predominantemente limpo", icon: "🌤️" },
    2: { description: "Parcialmente nublado", icon: "⛅" },
    3: { description: "Nublado", icon: "☁️" },
    45: { description: "Nevoeiro", icon: "🌫️" },
    48: { description: "Nevoeiro com geada", icon: "🌫️" },
    51: { description: "Garoa leve", icon: "🌦️" },
    53: { description: "Garoa moderada", icon: "🌦️" },
    55: { description: "Garoa intensa", icon: "🌧️" },
    56: { description: "Garoa congelante leve", icon: "🌧️" },
    57: { description: "Garoa congelante intensa", icon: "🌧️" },
    61: { description: "Chuva leve", icon: "🌦️" },
    63: { description: "Chuva moderada", icon: "🌧️" },
    65: { description: "Chuva forte", icon: "🌧️" },
    66: { description: "Chuva congelante leve", icon: "🌧️" },
    67: { description: "Chuva congelante forte", icon: "🌧️" },
    71: { description: "Neve leve", icon: "🌨️" },
    73: { description: "Neve moderada", icon: "🌨️" },
    75: { description: "Neve forte", icon: "❄️" },
    77: { description: "Grãos de neve", icon: "❄️" },
    80: { description: "Pancadas leves", icon: "🌦️" },
    81: { description: "Pancadas moderadas", icon: "🌧️" },
    82: { description: "Pancadas violentas", icon: "⛈️" },
    85: { description: "Neve em pancadas leves", icon: "🌨️" },
    86: { description: "Neve em pancadas fortes", icon: "❄️" },
    95: { description: "Trovoada", icon: "⛈️" },
    96: { description: "Trovoada com granizo leve", icon: "⛈️" },
    99: { description: "Trovoada com granizo forte", icon: "⛈️" },
    };

    function getWeatherInfo(code: number, isDay: boolean) {
    const info = WMO_CODES[code] || {
        description: "Desconhecido",
        icon: "🌡️",
    };

    if (isDay) return info;

    if (code <= 1) return { ...info, icon: "🌙" };

    return info;
    }

    export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");

    if (!city) {
        return NextResponse.json(
        { message: "O parâmetro 'city' é obrigatório" },
        { status: 400 }
        );
    }

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt`;

        const geoResponse = await fetch(geoUrl);
        const geoData: GeocodingResponse = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json(
            { message: `Cidade "${city}" não encontrada` },
            { status: 404 }
        );
        }

        const location = geoData.results[0];

        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
        return NextResponse.json(
            { message: "Erro ao buscar dados de previsão" },
            { status: forecastResponse.status }
        );
        }

        const forecastData: OpenMeteoResponse = await forecastResponse.json();
        const current = forecastData.current;
        const isDay = current.is_day === 1;
        const weatherInfo = getWeatherInfo(current.weather_code, isDay);

        const weatherData: WeatherData = {
        city: location.name,
        country: location.country_code,
        state: location.admin1,
        temperature: current.temperature_2m,
        feels_like: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        wind_speed: current.wind_speed_10m,
        wind_direction: current.wind_direction_10m,
        temp_min: forecastData.daily.temperature_2m_min[0],
        temp_max: forecastData.daily.temperature_2m_max[0],
        weather_code: current.weather_code,
        is_day: isDay,
        description: weatherInfo.description,
        icon: weatherInfo.icon,
        };

        return NextResponse.json(weatherData);
    } catch {
        return NextResponse.json(
        { message: "Erro ao consultar a previsão do tempo" },
        { status: 500 }
        );
    }
    }