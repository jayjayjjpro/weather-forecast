import React, { useEffect, useState } from 'react';

const WeatherInfoCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        // Round coordinates to avoid grid mismatch
        const lat = parseFloat(city.lat).toFixed(2);
        const lon = parseFloat(city.lon).toFixed(2);

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
        );

        const data = await response.json();

        if (data.current_weather) {
          setWeather(data.current_weather);
        } else {
          throw new Error('Current weather data not available');
        }
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(err.message || 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-2">Weather in {city.name}</h2>

      {loading ? (
        <p>Loading weather data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : weather ? (
        <>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
          <p>Wind Direction: {weather.winddirection}°</p>
          <p>Weather Code: {weather.weathercode}</p>
          <p>Time: {weather.time}</p>
        </>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherInfoCard;
