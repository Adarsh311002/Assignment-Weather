
# Weather Dashboard 🌦️



A full-stack weather monitoring application with user authentication and real-time weather data integration.

[Weather  Flowchart]![Image](https://github.com/user-attachments/assets/70779f79-ab44-4ad5-8fe4-db071325e977)



## Features ✨

- 🔐 JWT-based user authentication (Signup/Login)
- 📍 Automatic current location weather detection
- 🔍 Manual city search functionality
- 📊 Detailed weather metrics display
- 🎨 Responsive UI with Material-UI + Tailwind CSS
- 🛡️ Comprehensive error handling and validation
- 🔄 Real-time data updates

# API Documentation 📚

## Authentication Endpoints

| Endpoint                | Method | Body                                | Description           |
|-------------------------|--------|-------------------------------------|-----------------------|
| `/api/auth/register`    | POST   | `{ email, password, username }`     | User registration     |
| `/api/auth/login`       | POST   | `{ email, password }`               | User authentication   |

## Weather Data Endpoint

### GET `/api/weather`

#### Parameters

| Parameter | Required | Description                                     | Example          |
|-----------|----------|-------------------------------------------------|------------------|
| `q`       | Yes      | Location query (city, coordinates, IP)          | `q=London`       |
| `units`   | No       | `metric` (℃) or `imperial` (℉)                   | `units=imperial` |

#### Example Request

```bash
curl -X GET "http://localhost:5000/api/weather?q=London&units=metric" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"

```
### Success Response
```bash
{
  "temp": 22.5,
  "feels_like": 24.3,
  "humidity": 65,
  "wind_speed": 12.4,
  "condition": "Partly cloudy",
  "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
  "region": "England",
  "country": "United Kingdom",
  "timezone": "Europe/London",
  "last_updated": "2023-09-20 14:30"
}
```

### Error Responses
```bash
{
  "status": 401,
  "message": "Unauthorized: Invalid token"
}
```
## Technologies 🛠️

**Frontend:**
- React Vite
- React Router 
- Material-UI (MUI) 
- Tailwind CSS
- Axios
- React Context API
- Geolocation API

**Backend:**
- Node.js 
- Express.js 
- MongoDB v6 + Mongoose
- JWT Authentication
- WeatherAPI Integration

**Services:**
- [WeatherAPI](https://www.weatherapi.com/) - Weather data
- MongoDB Atlas - Cloud Database
- Vercel/Render - Deployment

## Installation ⚙️

### Prerequisites
- Node.js 
- MongoDB Atlas account
- [WeatherAPI](https://www.weatherapi.com/) key (Free tier available)

### Backend Setup
```bash
# Clone repository
git clone https://github.com/Adarsh311002/Assignment-Weather
cd weather-dashboard/server

# Install dependencies
npm install

# Configure environment
# Edit .env with your credentials

# Start server
npm run dev
```
### Frontend Setup
```bash
cd ../client
npm install

# Configure environment
# Edit .env with your API base URL
# Start development server
npm run dev
