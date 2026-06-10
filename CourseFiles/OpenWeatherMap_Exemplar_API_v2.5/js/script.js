/* This example uses the OpenWeatherMap API to get the local sunrise and
    sunset times for a specified latitude and longitude.
 */
// Edit to use your own OpenWeatherMap API key
const API_KEY = "<REPLACE WITH YOUR API KEY>";

const BASE_OPENWEATHERMAP_URL = "https://api.openweathermap.org/data/2.5/weather";

// Get references to DOM elements
const form = document.getElementById("weather-form");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weather-result");
const locationName = document.getElementById("location-name");
const sunriseDisplay = document.getElementById("sunrise");
const sunsetDisplay = document.getElementById("sunset");

// Listen for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the form from reloading the page

    const latValue = document.getElementById("lat").value;
    const lonValue = document.getElementById("lon").value;

    // Basic validation (on top of HTML5 required)
    if (latValue === "" || lonValue === "") {
        message.textContent = "Please enter both latitude and longitude.";
        weatherCard.classList.add("hidden");
        return;
    }

    // Show loading message
    message.textContent = "Loading weather data...";
    weatherCard.classList.add("hidden");

    // Build the URL for the OpenWeatherMap API (metric = Celsius)
    const url =
        BASE_OPENWEATHERMAP_URL + "?lat=" +
        encodeURIComponent(latValue) +
        "&lon=" +
        encodeURIComponent(lonValue) +
        "&units=metric&appid=" +
        API_KEY;

    /* Call the API using fetch() to make an asynchronous call.
       The subsequent .then() calls retrieve the JSON, pull out the
       needed data, and update the page.
     */
    fetch(url)
        // Chain steps in process using then(). 1st get the JSON from the response
        .then(function (response) {
            return response.json();
        })
        // 2nd step: Get the desired values
        .then(function (data) {
            // City/location name and timezone offset in top-level JSON document
            const cityName = data.name;
            const timezoneOffset = data.timezone;
            // Country abbreviation, sunrise, and sunset are in the sys JSON subdocument.
            const country = data.sys.country;
            const sunriseUTC = data.sys.sunrise;
            const sunsetUTC = data.sys.sunset;

            // Convert times to local times in milliseconds (for location specified)
            // Apply the offset to the UTC timestamp in milliseconds
            const localSunriseTimestampMs = (sunriseUTC + timezoneOffset) * 1000;
            const localSunsetTimestampMs = (sunsetUTC + timezoneOffset) * 1000;

            // Create a Date for that local time
            const sunriseLocal = new Date(localSunriseTimestampMs);
            const sunsetLocal = new Date(localSunsetTimestampMs);

            // Format date and time for display (24-hour time format)
            const formatter = new Intl.DateTimeFormat('en-US', {
                year:   'numeric',
                month:  '2-digit',
                day:    '2-digit',
                hour:   '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'UTC' // Data from OpenWeatherMap reflects UTC (GMT)
            });

            // Update the page
            locationName.textContent = cityName + ", " + country;
            sunriseDisplay.textContent = "Local Sunrise: " + formatter.format(sunriseLocal)
            sunsetDisplay.textContent  = "Local Sunset: " + formatter.format(sunsetLocal)
            message.textContent = "";
            weatherCard.classList.remove("hidden");
        })
        // Handle errors
        .catch(function (error) {
            console.log(error); // Details in dev tools console
            message.textContent =
                "Sorry, something went wrong. Please try again.";
            weatherCard.classList.add("hidden");
        });
});
