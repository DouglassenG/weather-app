    import { NextRequest, NextResponse } from "next/server";
    import { WeatherResponse, WeatherError } from "@/types/weather";

    export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");

    if (!city) {
        return NextResponse.json(
        { message: "O parâmetro 'city' é obrigatório" },
        { status: 400 }
        );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
        { message: "API key não configurada no servidor" },
        { status: 500 }
        );
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
        const errorData: WeatherError = await response.json();
        return NextResponse.json(
            { message: errorData.message },
            { status: response.status }
        );
        }

        const data: WeatherResponse = await response.json();
        return NextResponse.json(data);

    } catch {
        return NextResponse.json(
        { message: "Erro ao consultar a previsão do tempo" },
        { status: 500 }
        );
    }
    }