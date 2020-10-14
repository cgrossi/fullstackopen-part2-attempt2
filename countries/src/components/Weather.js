import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(weather => {
        setWeather(weather.data)
      })
  })

  if(Object.keys(weather).length > 0) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><strong>Temperature: </strong> {weather.main.temp} °C</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather.description} height="50px" />
        <p><strong>Wind: </strong> {weather.wind.speed} m/s</p>
      </div>
  )}
  
  return <h3>Weather in {capital}</h3>
} 

export default Weather;