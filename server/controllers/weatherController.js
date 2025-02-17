const axios = require('axios');

const getWeather = async (req, res) => {
  try {
    const { q } = req.query;

     if (!q) return res.status(400).json({ message: 'Location parameter required' });

    
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${q}`
    );
    
if (error.response) {
    const weatherApiError = error.response.data.error;
    const message = `${weatherApiError.code} - ${weatherApiError.message}`;
    return res.status(400).json({ message });
  }
    const { current, location } = response.data;
    
    const weatherData = {
      temp: current.temp_c,
      feels_like: current.feelslike_c,
      humidity: current.humidity,
      wind_speed: current.wind_kph,
      condition: current.condition.text,
      icon: current.condition.icon,
      region: location.region,
      country: location.country
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.response?.data);
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Error fetching weather data';
    res.status(status).json({ message });
  }
};

module.exports = { getWeather };