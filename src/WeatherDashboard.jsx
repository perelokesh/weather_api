import React, { useState, useEffect } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import axios from 'axios';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [lastCity, setLastCity] = useState(localStorage.getItem('lastCity') || '');

  useEffect(() => {
    fetchFavorites();
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, [lastCity]);

  const fetchWeather = async (city) => {
    const API_KEY = 'cf3d1ff66d9be5200f615dbce2f15965';
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
      setWeatherData({
        current: response.data,
        forecast: forecastResponse.data
      });
      console.log(forecastResponse)
      setLastCity(city);
      localStorage.setItem('lastCity', city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:3001/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const addFavorite = async (city) => {
    try {
      const response = await axios.post('http://localhost:3001/favorites', { city });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${id}`);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="weather-dashboard">
      <Search fetchWeather={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} unit={unit} setUnit={setUnit} />
      <Favorites favorites={favorites} fetchWeather={fetchWeather} addFavorite={addFavorite} removeFavorite={removeFavorite} />
    </div>
  );
};

export default WeatherDashboard;
