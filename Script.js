const weatherKey = '41cd502bc7a739c91a7b29e8e3c13c8a';
const aqiKey = 'e614fdc9-dcf3-429f-aaf3-e053f1795d3a';

async function fetchWeatherAndAQI() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  try {
    // Get weather data
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`;
    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();

    if (weatherData.cod !== 200) {
      alert("City not found. Please try again.");
      return;
    }

    // Show weather info
    const temp = weatherData.main.temp;
    const desc = weatherData.weather[0].description;
    document.getElementById("city").textContent = city.toUpperCase();
    document.getElementById("weather").textContent = `🌤️ ${temp}°C, ${desc}`;

    // Get AQI data
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    const aqiURL = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${aqiKey}`;
    const aqiRes = await fetch(aqiURL);
    const aqiData = await aqiRes.json();

    const aqiVal = aqiData.data.current.pollution.aqius;
    let quality = "", className = "";
    if (aqiVal <= 50) { quality = "Good"; className = "aqi-good"; }
    else if (aqiVal <= 100) { quality = "Moderate"; className = "aqi-moderate"; }
    else { quality = "Poor"; className = "aqi-poor"; }

    document.getElementById("aqi").innerHTML =
      `AQI: <span class="${className}">${aqiVal} (${quality})</span>`;

  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Something went wrong. Please try again later.");
  }
}
