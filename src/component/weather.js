import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './weather.css';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const cityRef = useRef(null); 

  const apiKey = '80910612dcf7b8881a64531ad282247c'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

  const fetchWeather = async (city) => {
    if (city !== '') {
      const url = `${apiUrl}${city}&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
        setError(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError(true);
          setWeatherData(null);
        } else {
          console.error('Error fetching the weather data:', error);
          setError(true);
        }
      }
    }
  };

  useEffect(() => {
    
  }, []);

  const handleSearch = () => {
    const city = cityRef.current.value;
    fetchWeather(city);
  };

  const weatherIconUrl = weatherData
    ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : '';

  return (
    <div className="card" >
      <p>Weather Application</p>
      <div className="search">
        <input
          type="text"
          placeholder="Enter your city"
          ref={cityRef} 
        />
        <button className="btn" onClick={handleSearch}>
          Click
        </button>
      </div>
      {error && (
        <div className="error">
          <p>Invalid city name</p>
        </div>
      )}
      {weatherData && (
        <div className="weather">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-qAo2IZB28B6B4VPzvb2ROO7yBzsJv3kfpA&s" alt="Weather icon" className="weather-icon" />
          <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
          <h2 className="city">{weatherData.name}</h2>

          <div className="row">
            <div className="col">
              <img src="https://cdn-icons-png.flaticon.com/512/4148/4148460.png" alt="Humidity icon" className="icon" />
              <div className="para1">
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="https://media.istockphoto.com/id/1347708317/vector/wind-weather-thin-line-icon.jpg?s=612x612&w=0&k=20&c=_CZj2l6ecQpFu4doH4nrDTipA6g1zAIfn93IrFn3N4s=" alt="Wind icon" className="icon" />
              <div className="para1">
                <p className="wind">{weatherData.wind.speed} km/h</p>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
