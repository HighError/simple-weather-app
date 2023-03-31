import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchLocation from '../components/SearchLocation';
import axios from 'axios';

function Main() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function getData(search) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${
            import.meta.env.VITE_APIKEY
          }&limit=5`,
        );
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    const search = searchParams.get('s');
    if (!search) {
      setIsLoading(false);
    } else {
      getData(search);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <>
        <div className="default absolute top-0 left-0 right-0 bottom-0" />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-3">
          <div className="text-[72px]">Завантаження...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="default absolute top-0 left-0 right-0 bottom-0" />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-3">
        <div className="text-[48px] font-medium">Пошук локації:</div>
        <div className="flex flex-row gap-5">
          <input
            className="bg-transparent border-white border-2 px-4 py-3 rounded-lg"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/?s=${searchInput}`);
              }
            }}
          />
          <button
            className="bg-purple-700 hover:bg-purple-600 duration-300 rounded-md px-3 py-2"
            onClick={() => {
              navigate(`/?s=${searchInput}`);
            }}
          >
            Пошук
          </button>
        </div>
        <div className={`mt-20 ${searchParams.get('s') ? 'block' : 'hidden'}`}>
          <div className="text-[24px] font-medium">
            Результати пошуку для "{searchParams.get('s')}":
          </div>
          {!data && <div>Помилка серверу</div>}
          {data && (
            <div className="flex flex-col gap-2 mt-4 items-center">
              {data.map((e) => (
                <SearchLocation
                  key={`${e.lat} ${e.lon}`}
                  title={e.local_names?.uk ?? e.name}
                  country={e.country}
                  lat={e.lat}
                  lon={e.lon}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
