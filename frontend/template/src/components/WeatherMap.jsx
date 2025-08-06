import React from 'react';

const WeatherMap = ({ city }) => {
  return (
    <div className="bg-white rounded shadow p-4 h-full">
      <h2 className="text-xl font-semibold mb-2">Map for {city.name}</h2>
      <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
        <iframe
          src={`https://www.rainviewer.com/map.html?loc=${city.lat},${city.lon},5&oCS=1&c=3&o=83&lm=1&layer=radar&sm=1&sn=1`}
          width="100%"
          frameBorder="0"
          style={{ border: 0, height: '50vh' }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WeatherMap;