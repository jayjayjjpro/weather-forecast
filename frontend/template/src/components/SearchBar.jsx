import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) {
      onSearch({ name: input });
    }
  };

  return (
    <div className="flex justify-center">
      <input
        className="border px-4 py-2 rounded-l w-64"
        type="text"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
