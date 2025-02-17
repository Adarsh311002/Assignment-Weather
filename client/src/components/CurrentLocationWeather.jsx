import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';

const CurrentLocationWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const res = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
        );

        setWeather({
          temp: res.data.current.temp_c,
          feels_like: res.data.current.feelslike_c,
          humidity: res.data.current.humidity,
          wind_speed: res.data.current.wind_kph,
          iconUrl: `https:${res.data.current.condition.icon}`,
          condition: res.data.current.condition.text,
          region: res.data.location.region,
          country: res.data.location.country,
        });
      } catch (err) {
        setError(
          err.response?.data?.error?.message || 'Failed to fetch location weather'
        );
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setError('Location access denied. Please enable permissions.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, px: 2 }}>
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 3,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: 3,
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
            Your Current Location Weather
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Detecting location...
              </Typography>
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={weather.iconUrl}
                    alt="Weather condition"
                    style={{ width: 100, height: 100 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {weather.temp}°C
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#555' }}>
                  Feels like {weather.feels_like}°C
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ textTransform: 'capitalize', color: '#333' }}>
                  {weather.condition}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  Humidity: {weather.humidity}%
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  Wind Speed: {weather.wind_speed} km/h
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                  {weather.region}, {weather.country}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CurrentLocationWeather;
