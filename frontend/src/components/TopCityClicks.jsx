import { useEffect, useState } from 'react';
import popularCities from '../data/popularCities.js';

const TopCityClicks = ({ refreshTrigger = 0 }) => {
  const [topCities, setTopCities] = useState([]);

  useEffect(() => {
    const fetchCityClicks = async () => {
      try {
        // Fetch weather data for each city in parallel
        const results = await Promise.all(
          popularCities.map(async (city) => {
            const res = await fetch(
              `https://backend-mauve-alpha-66s1ssfbt7.vercel.app/weather?city=${encodeURIComponent(city.name)}`
            );
            const data = await res.json();
            return { name: city.name, clicks: data.clicks ?? 0 };
          })
        );

        // Sort by clicks and get top 5
        const top5 = results
          .sort((a, b) => b.clicks - a.clicks)
          .slice(0, 5);

        setTopCities(top5);
      } catch (error) {
        console.error('Error fetching city click data:', error);
      }
    };

    fetchCityClicks();
  }, [refreshTrigger]); // <--- dependency triggers refresh

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Top 5 Cities by Clicks</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-1">City</th>
            <th className="px-2 py-1">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {topCities.map((city, index) => (
            <tr key={index}>
              <td className="px-2 py-1">{city.name}</td>
              <td className="px-2 py-1">{city.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCityClicks;
