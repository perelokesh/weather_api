import React from 'react';

const WeatherDisplay = ({ weatherData, unit, setUnit }) => {
  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const { current, forecast } = weatherData;

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="weather-display">
      <button onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      <h2>Current Weather in {current.name}</h2>
      <p>Temperature: {current.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Condition: {current.weather[0].description}</p>

      <h2>5-Day Forecast</h2>
      <div className="forecast">
        {forecast.list.map((entry, index) => (
          <div key={index} className="forecast-entry">
            <p>{new Date(entry.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: {entry.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Condition: {entry.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
