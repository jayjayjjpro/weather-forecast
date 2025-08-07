import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import CityCard from './components/CityCard.jsx';
import WeatherInfoCard from './components/WeatherInfoCard.jsx';
import WeatherMap from './components/WeatherMap.jsx';
import popularCities from './data/popularCities.js';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(popularCities[0]);

  // New function to handle city card clicks
  const handleCityClick = async (city) => {
    try {
      // Call backend to increment click count
      const res = await fetch(
        `https://supreme-garbanzo-pwwgvwr957f7rp7-3000.app.github.dev/weather/click?city=${encodeURIComponent(city.name)}`
      );

      if (!res.ok) {
        console.error('Failed to update click count');
      }

      // Update the selected city state anyway
      setSelectedCity(city);
    } catch (error) {
      console.error('Error updating click count:', error);
      // Still update selected city so UI remains responsive
      setSelectedCity(city);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* <SearchBar onSearch={setSelectedCity} /> */}

      <div className="my-4 overflow-x-auto whitespace-nowrap">
        {popularCities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            lon={city.lon}
            lat={city.lat}
            onClick={() => handleCityClick(city)} // Use new handler here
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <WeatherInfoCard city={selectedCity} />
        <WeatherMap city={selectedCity} />
      </div>
    </div>
  );
};

export default App;
