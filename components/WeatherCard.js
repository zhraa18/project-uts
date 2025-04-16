import { useState } from "react";

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="p-4 bg-white dark:bg-blue-900 shadow rounded w-full max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Cek Cuaca</h2>
      
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Masukkan nama kota"
        className="p-2 border rounded w-full mb-4 placeholder-black text-black dark:text-white dark:bg-blue-800 dark:border-blue-700 text-center"
      />
      
      <button
        onClick={fetchWeather}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
      >
        Lihat Cuaca
      </button>

      {weather && !weather.error && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {weather.location}, {weather.country}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{weather.condition}</p>
          <img
            src={weather.icon}
            alt={weather.condition}
            className="mx-auto"
          />
          <p className="text-2xl text-black dark:text-white">{weather.temperature_c}°C</p>
        </div>
      )}

      {weather?.error && (
        <p className="text-red-500 mt-4">Gagal mengambil data cuaca.</p>
      )}
    </div>
  );
}
