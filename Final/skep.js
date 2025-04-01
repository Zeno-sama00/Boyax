// Function to toggle the visibility of the weather widget
function toggleWeather() {
    const widget = document.getElementById("weatherWidget");
    widget.classList.toggle("open");
}

// Fetch and display weather data from OpenWeatherMap
async function getWeather() {
    const apiKey = "ed3b158f56d73941aa20954dbd8f33f1";
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

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("forecast").innerHTML = "<p>⚠️ Failed to load weather data.</p>";
    }
}

// Function to display weather data
function displayWeather(data) {
    const cityName = document.getElementById("city-name");
    const forecastContainer = document.getElementById("forecast");

    cityName.textContent = `Today's Weather - ${new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" })}`;

    let forecastHTML = "";
    for (let i = 0; i < 6; i++) { // Show next 6 time slots
        let item = data.list[i];
        let date = new Date(item.dt_txt);
        let formattedDate = date.toLocaleDateString([], { weekday: "short", month: "long", day: "numeric" });
        let time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let temp = Math.round(item.main.temp);
        let icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        let rainChance = item.pop ? `${Math.round(item.pop * 100)}% Rain Chance` : "☀️ No Rain Expected";

        forecastHTML += `
            <div class="forecast-item">     
                <span class="temp">${temp}°C</span>
                <img src="${icon}" alt="Weather icon">
                <span class="rain">${rainChance}</span>
                <span class="date">${formattedDate}</span>
                <span class="time">${time}</span>
            </div>
        `;
    }

    forecastContainer.innerHTML = forecastHTML;
}

// Load the weather on page load
getWeather();

// Function to toggle the visibility of the weather widget
function toggleCalendar() {
    const widget = document.getElementById("calendarWidget");
    widget.classList.toggle("open");
}

$(document).ready(function() {
    let startDate = null;
    let endDate = null;
    let productionName = null;

    // Initialize the calendar
    $('#calendar').fullCalendar({
        editable: true,
        droppable: true,
        defaultView: 'month',
        events: function(start, end, timezone, callback) {
            let events = [];
            if (startDate) {
                events.push({
                    title: 'Start Date', // Title for start planting event
                    start: startDate,
                    className: 'planted-day', // Custom class for planting start date
                    eventType: 'start' // Add eventType to distinguish start and end events
                });
            }
            if (endDate) {
                events.push({
                    title: 'End Date', // Title for end planting event
                    start: endDate,
                    className: 'end-day', // Custom class for planting end date
                    eventType: 'end' // Add eventType to distinguish start and end events
                });
            }
            callback(events);
        },

        // Enable tooltips to show full title on hover
        eventRender: function(event, element) {
            element.attr('title', event.title);

            // Remove all inner content except the title (no extra 'p' tags)
            element.find('.fc-title').text(event.title);
        },

        // Make events clickable to show full event details in modal
        eventClick: function(event, jsEvent, view) {
            let eventDetails = '<p><strong>Production:</strong> ' + productionName + '</p>';
            if (event.eventType === 'start') {
                eventDetails += '<p><strong>Start Date:</strong> ' + event.start.format('YYYY-MM-DD HH:mm:ss') + '</p>';
            } else if (event.eventType === 'end') {
                eventDetails += '<p><strong>End Date:</strong> ' + event.start.format('YYYY-MM-DD HH:mm:ss') + '</p>';
            }

            // Show event details in the modal when clicked
            $('#eventDetails').html(eventDetails);

            // Open the modal
            $('#eventModal').modal('show');
        }
    });

    // Start Planting Button functionality
    $('#startPlantingBtn').click(function() {
        // Prompt for production name
        productionName = prompt("Please enter a production name (e.g., plant type or batch):");

        if (productionName) {
            // Capture the current date as the start date
            startDate = new Date();
            endDate = null;  // Reset end date in case of new planting session

            // Mark the start date on the calendar
            $('#calendar').fullCalendar('refetchEvents'); // Refresh calendar to display new event

            // Disable Start button and enable End button
            $(this).prop('disabled', true);
            $('#endPlantingBtn').prop('disabled', false);
        } else {
            alert("Production name is required to start planting.");
        }
    });

    // End Planting Button functionality
    $('#endPlantingBtn').click(function() {
        // Ask for confirmation before ending the planting
        if (confirm("Are you sure you want to end the planting session for '" + productionName + "'?")) {
            // Capture the current date as the end date
            endDate = new Date();

            // Mark the end date on the calendar
            $('#calendar').fullCalendar('refetchEvents'); // Refresh calendar to display new event

            // Disable End button after session ends
            $(this).prop('disabled', true);
        }
    });
});