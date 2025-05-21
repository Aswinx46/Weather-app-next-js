import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'
export default async function findWeather(req: NextApiRequest, res: NextApiResponse) {
    const { location } = req.query
    if (!location) {
        return res.status(400).json({ message: "No location found" })
    }
    try {
        const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search`,
            {
                params: {
                    q: location,
                    format: 'json',
                    limit: 1
                }
            }
        )
        const geoData = geoRes.data as Array<{ lat: string; lon: string }>;
        if (!geoData || geoData.length === 0) {
            return res.status(404).json({ error: "Location not found" });
        }
        const { lat, lon } = geoData[0];
        const weatherRes = await axios.get(
            `https://api.open-meteo.com/v1/forecast`,
            {
                params: {
                    latitude: lat,
                    longitude: lon,
                    current_weather: true,
                },
            }
        );

        const weatherData = weatherRes.data as {
            current_weather: {
                temperature: number;
                windspeed: number;
                time: string;
            };
        };
        res.status(200).json({
            location,
            latitude: lat,
            longitude: lon,
            temperature: weatherData.current_weather.temperature,
            windspeed: weatherData.current_weather.windspeed,
            time: weatherData.current_weather.time,
        });
    } catch (error) {
        console.log('error while fetching  the weather details', error)
        res.status(500).json({
            error: 'error while fetching the weather details',
            message: error instanceof Error ? error.message : 'error while fetching the weather details'
        })
    }
}