import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import CityCard from './components/CityCard.jsx';
import WeatherInfoCard from './components/WeatherInfoCard.jsx';
import WeatherMap from './components/WeatherMap.jsx';
import popularCities from './data/popularCities.js';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(popularCities[0]);

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
            onClick={() => setSelectedCity(city)}
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

