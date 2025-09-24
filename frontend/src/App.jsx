import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import CityCard from './components/CityCard.jsx';
import WeatherInfoCard from './components/WeatherInfoCard.jsx';
import WeatherMap from './components/WeatherMap.jsx';
import TopCityClicks from './components/TopCityClicks.jsx';
import popularCities from './data/popularCities.js';

const App = () => {
  const [cities, setCities] = useState(popularCities);
  const [selectedCity, setSelectedCity] = useState(popularCities[0]);
  const [refreshClicks, setRefreshClicks] = useState(0);

  const handleCityClick = async (city) => {
    try {
      const res = await fetch(
        `backend-six-bice-19.vercel.app/weather/click?city=${encodeURIComponent(city.name)}`
      );

      let updated = {};
      if (res.ok) {
        updated = await res.json();
      } else {
        console.error('Failed to update click count');
      }

      const newCities = cities.map((c) =>
        c.name === updated.city
          ? { ...c, count: updated.clicks ?? c.count ?? 0 }
          : c
      );

      setCities(newCities);

      const updatedCity = newCities.find((c) => c.name === city.name);
      setSelectedCity(updatedCity);

      setRefreshClicks((prev) => prev + 1);
    } catch (error) {
      console.error('Error updating click count:', error);
      setSelectedCity(city);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* City buttons */}
      <div className="my-4 overflow-x-auto whitespace-nowrap">
        {cities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            onClick={() => handleCityClick(city)}
          />
        ))}
      </div>

      {/* Main content: 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Left: Top City Clicks */}
        <div className="order-1 lg:order-none">
          <TopCityClicks refreshTrigger={refreshClicks} />
        </div>

        {/* Middle: Weather Info Card */}
        <div className="order-2 lg:order-none">
          <WeatherInfoCard city={selectedCity} />
        </div>

        {/* Right: Weather Map */}
        <div className="order-3 lg:order-none">
          <WeatherMap city={selectedCity} />
        </div>
      </div>
    </div>
  );
};

export default App;
