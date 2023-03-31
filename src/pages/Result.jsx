import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import getClassBackground from '../background';
import Snowfall from 'react-snowfall';

function Result() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const lon = searchParams.get('lon');
  const lat = searchParams.get('lat');

  useEffect(() => {
    async function getData(lon, lat) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${
            import.meta.env.VITE_APIKEY
          }&lat=${lat}&lon=${lon}&lang=uk&units=metric`,
        );
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    }

    if (!lon || !lat) {
      navigate('/');
    } else {
      getData(lon, lat);
    }
  }, []);

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
      {data.weather[0]?.main === 'Snow' && (
        <div className="relative w-full h-screen z-50">
          <Snowfall />
        </div>
      )}
      <div
        className={`${getClassBackground(
          data.weather[0]?.main ?? '',
        )} absolute top-0 left-0 right-0 bottom-0`}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-3">
        <div className="text-[24px] font-medium">
          {formatName(data, lon, lat)}
        </div>
        <div className="text-[96px] font-bold">{data.main?.temp}°C</div>
        <div className="flex flex-col items-center">
          <div className="">{data.weather[0]?.description ?? ''}</div>
        </div>
      </div>
    </>
  );
}

function formatName(data, lon, lat) {
  if (data.sys.country && data.name) {
    return `${data.sys.country}, ${data.name}`;
  }

  if (data.name) {
    return `${data.name}`;
  }

  return `${lon} ${lat}`;
}

export default Result;
