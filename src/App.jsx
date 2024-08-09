import React, { useState } from 'react';
import axios from 'axios';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import './App.css';
const API_KEY = 'dd27b83e7b1c5656c019bfe8fbf00db5';
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log('API Response:', response.data);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <About />
        <div className="input-container">
          <WeatherInput onSearch={fetchWeather} />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="weather-display">
          <WeatherDisplay weatherData={weatherData} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
