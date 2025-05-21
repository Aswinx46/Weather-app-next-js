export interface WeatherDetailsProps {
    location: string
    latitude: number
    longitude: number
    temperature: number
    windspeed: number
    time: string
}
export interface Weather {
    weather:WeatherDetailsProps
}