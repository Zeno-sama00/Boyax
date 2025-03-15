const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    // Responsive: Toggle sidebar in mobile mode
    if (window.innerWidth <= 480) {
        sidebar.classList.toggle("open");
    }
});
async function getWeather() {
    const apiKey = ""; // 🔹 Replace with your OpenWeatherMap API key
    const city = "Manila"; 
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod !== "200") {
            console.error("Failed to fetch weather data.");
            document.getElementById("forecast").innerHTML = "<p>⚠️ Failed to load weather data.</p>";
            return;
        }

        displayWeather(data, city);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("forecast").innerHTML = "<p>⚠️ Failed to load weather data.</p>";
    }
}

function displayWeather(data, city) {
    const cityName = document.getElementById("city-name");
    const forecastContainer = document.getElementById("forecast");

    cityName.textContent = `Weather in ${city} - ${new Date().toLocaleDateString([], { weekday: "long", month: "short", day: "numeric", year: "numeric" })}`;

    let forecastHTML = "";
    for (let i = 0; i < 6; i++) { // Show next 6 time slots
        let item = data.list[i];
        let date = new Date(item.dt_txt);
        let time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let formattedDate = date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
        let temp = Math.round(item.main.temp);
        let icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        let rainChance = item.weather[0].main.toLowerCase().includes("rain") ? "🌧️ Rain Expected" : "☀️ No Rain";

        forecastHTML += `
            <div class="forecast-item">
                <span class="date">${formattedDate}</span>
                <span class="time">${time}</span>
                <img src="${icon}" alt="Weather icon">
                <span class="temp">${temp}°C</span>
                <span class="rain">${rainChance}</span>
            </div>
        `;
    }

    forecastContainer.innerHTML = forecastHTML;
}

// Load the weather on page load
getWeather();
