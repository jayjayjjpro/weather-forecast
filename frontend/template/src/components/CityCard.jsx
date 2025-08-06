import React from 'react';

const CityCard = ({ city, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-block bg-white shadow rounded px-4 py-2 m-2 hover:bg-blue-100"
    >
      {city.name}
    </button>
  );
};

export default CityCard;
