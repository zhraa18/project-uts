// pages/api/weather.js
import axios from "axios";

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: apiKey,
        q: city,
        aqi: "no",
      },
    });

    const data = response.data;
    return res.status(200).json({
      location: data.location.name,
      region: data.location.region,
      country: data.location.country,
      temperature_c: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch weather data", details: error.message });
  }
}
