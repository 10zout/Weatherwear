import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [outfit, setOutfit] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      const location = 'New York'; // Replace with dynamic user location
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      setWeather(res.data);
      recommendOutfit(res.data);
    };

    fetchWeather();
  }, []);

  const recommendOutfit = (weatherData) => {
    const temp = weatherData.main.temp - 273.15; // Convert from Kelvin to Celsius
    let recommendation;
    if (temp > 25) {
      recommendation = 'Tank top and shorts';
    } else if (temp > 15) {
      recommendation = 'T-shirt and jeans';
    } else {
      recommendation = 'Jacket and pants';
    }
    setOutfit(recommendation);
    logOutfitHistory(weatherData, recommendation);
  };

  const logOutfitHistory = async (weatherData, recommendation) => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5002/api/outfitHistory', {
      weather: weatherData.weather[0].description,
      temperature: weatherData.main.temp - 273.15,
      recommendation
    }, {
      headers: {
        'x-auth-token': token
      }
    });
  };

  return (
    <div className="home-container">
      {weather && (
        <>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Recommended Outfit: {outfit}</p>
        </>
      )}
      <button onClick={() => navigate('/history')}>View Outfit History</button>
    </div>
  );
};

export default Home;
