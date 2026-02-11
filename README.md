# Weather App

A web application that allows users to check current weather conditions

### 🌟Features

- 🔎 Location search with autocomplete
- 🌡️ Display of current weather conditions:
  - Temperature
  - Wind speed
  - Humidity
  - Pressure
  - Visibility
- ‼️Tips for users according to actual weather conditions

### 🛠️ Technologies Used

- React 19.2.4
- geocoding-api
- Visual Crossing Weather API

### 🚀 How to run

1. Clone git repository:
   ```
   git clone https://github.com/KacperCzernecki/weather-app.git
   ```
2. Install dependencies:
   ```
   cd weather-app
   npm install
   ```
3. Create an account on www.visualcrossing.com and generate your API key
4. Create a `.env` file in the project root and add Visual Crossing API key:
   ```
   VITE_API_KEY=your_visual_crossing_api_key
   ```
5. Start the development server:
   ```
   npm run dev
   ```
