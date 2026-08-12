export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  is_day: number;
}

export interface DailyWeather {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface HourlyWeather {
  time: string[];
  precipitation_probability: number[];
}

export interface OpenMeteoResponse {
  current: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}

export interface WeatherData {
  city: string;
  country: string;
  state?: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  temp_min: number;
  temp_max: number;
  weather_code: number;
  is_day: boolean;
  description: string;
  icon: string;
  precipitation_probability: number;
}