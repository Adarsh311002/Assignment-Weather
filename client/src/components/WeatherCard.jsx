import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");

    if (!city.trim()) {
      setError("Please enter a city name");
      setLoading(false);
      return;
    }

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
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
    } catch (error) {
      setError(
        error.response?.data?.error?.message || "Failed to fetch weather data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: 3,
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
            Weather App 🌤️
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              label="Enter City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={fetchWeather}
              disabled={!city || loading}
              sx={{ borderRadius: 1, px: 3 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
            </Button>
          </Box>

          {weather && (
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h3" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                {weather.temp}°C
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#555" }}>
                Feels like {weather.feels_like}°C
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={weather.iconUrl}
                  alt="Weather condition"
                  style={{ width: 100, height: 100 }}
                />
              </Box>
              <Typography variant="h6" sx={{ color: "#333", textTransform: "capitalize" }}>
                {weather.condition}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Humidity: {weather.humidity}%
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Wind Speed: {weather.wind_speed} km/h
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                {weather.region}, {weather.country}
              </Typography>
            </Box>
          )}

          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError("")}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherCard;
