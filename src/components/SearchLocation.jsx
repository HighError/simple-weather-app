import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchLocation({ title, country, lat, lon }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-3 bg-black/50 px-2 py-1 rounded-md items-center shadow-lg">
      <div>{title ?? ''}</div>
      <div>Країна: {country ?? ''}</div>
      <div>lat: {lat ?? ''}</div>
      <div>lon: {lon ?? ''}</div>
      <button
        className="bg-purple-700 hover:bg-purple-600 duration-300 rounded-md px-3 py-2"
        onClick={() => {
          navigate(`/result?lat=${lat}&lon=${lon}`);
        }}
      >
        Перейти
      </button>
    </div>
  );
}

export default SearchLocation;
