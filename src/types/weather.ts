// Representa um item do array "weather" da API
// Contém a descrição textual e o ícone do clima (ex: "nublado", "01d")
export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

// Dados principais: temperaturas e umidade
// A API retorna em Kelvin por padrão, mas vamos pedir em Celsius via parâmetro
export interface MainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

// Dados de vento: velocidade em m/s e direção em graus
export interface WindData {
  speed: number;
  deg: number;
}

// Resposta completa da API /weather (current weather)
// Junta todos os blocos acima + nome da cidade e país
export interface WeatherResponse {
  name: string;
  weather: WeatherCondition[];
  main: MainData;
  wind: WindData;
  sys: {
    country: string;
  };
}

// Tipo para quando a API retorna erro (ex: cidade não encontrada)
export interface WeatherError {
  message: string;
  cod: string;
}