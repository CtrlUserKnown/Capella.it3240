// weather.js - OpenWeatherMap API lookup
// Author: Christian Alvarez
// Date: 06/21/2026
// Retrieves current weather data using latitude and longitude coordinates.
//
// Purpose:
// Powers the Weather Lookup page, which is presented in the site narrative as
// the studio's "LocationWeather" tool — a utility for film crews checking
// conditions at remote shooting locations. From a course perspective this file
// demonstrates asynchronous JavaScript: the fetch API, Promise chaining, and
// updating the DOM with live data from an external source.
//
// Technique choices:
// - fetch() with .then()/.catch(): Uses the Promise-based fetch API rather than
//   the older XMLHttpRequest. .then() handles the two-step parse (response → JSON),
//   and .catch() handles any network or HTTP error in one place.
// - Coordinate-based lookup (lat/lon) instead of city name: The OpenWeatherMap
//   API supports both, but coordinates are unambiguous — searching "Chicago" could
//   match multiple cities in different countries. Coordinates are also more useful
//   for the intended film-crew audience scouting specific remote locations.
// - Input validation before fetch: Range checks on lat (-90 to 90) and lon
//   (-180 to 180) run before the API call so invalid requests never leave the
//   browser, avoiding wasted API calls and quota usage.
// - Unit toggle with CSS class swap: The °F/°C radio buttons update the API
//   request parameter (units=imperial or units=metric) and also toggle a CSS
//   class on the toggle element so the sliding indicator animates entirely in CSS.

// Read API key from config.js (loaded before this script in weather.html)
const API_KEY = CONFIG.OPENWEATHER_API_KEY;

// Get references to DOM elements
let weatherForm = document.getElementById("weatherForm");
let latitudeInput = document.getElementById("latitude");
let longitudeInput = document.getElementById("longitude");
let weatherMessage = document.getElementById("weather-message");
let locationName = document.getElementById("location-name");
let temperature = document.getElementById("temperature");
let conditions = document.getElementById("conditions");

// Unit toggle animation
document.querySelectorAll('input[name="units"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
        if (this.value === "metric") {
            document.getElementById("unit-toggle").classList.add("metric-active");
        } else {
            document.getElementById("unit-toggle").classList.remove("metric-active");
        }
    });
});

// Add submit event listener to the form
weatherForm.addEventListener("submit", function(event) {
    // Prevent form from reloading the page
    event.preventDefault();

    // Get input values
    let lat = latitudeInput.value.trim();
    let lon = longitudeInput.value.trim();

    // Validate inputs
    if (lat === "" || lon === "") {
        weatherMessage.textContent = "Please enter both latitude and longitude values.";
        weatherMessage.className = "form-message error";
        return;
    }

    let latNum = parseFloat(lat);
    let lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
        weatherMessage.textContent = "Latitude and longitude must be valid numbers.";
        weatherMessage.className = "form-message error";
        return;
    }

    if (latNum < -90 || latNum > 90) {
        weatherMessage.textContent = "Latitude must be between -90 and 90.";
        weatherMessage.className = "form-message error";
        return;
    }

    if (lonNum < -180 || lonNum > 180) {
        weatherMessage.textContent = "Longitude must be between -180 and 180.";
        weatherMessage.className = "form-message error";
        return;
    }

    // Display loading message
    weatherMessage.textContent = "Loading weather data...";
    weatherMessage.className = "form-message loading";

    // Clear previous results
    locationName.textContent = "";
    temperature.textContent = "";
    conditions.textContent = "";

    // Get selected unit
    let units = document.querySelector('input[name="units"]:checked').value;

    // Build the API URL
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + API_KEY;

    // Make the API call using fetch
    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Unable to retrieve weather data. Please check your coordinates.");
            }
            return response.json();
        })
        .then(function(data) {
            // Extract data from the response object
            let city = data.name;
            let country = data.sys.country;
            let temp = data.main.temp;
            let description = data.weather[0].description;

            // Display the data in the HTML elements
            locationName.textContent = city + ", " + country;
            let unitLabel = units === "imperial" ? "\u00B0F" : "\u00B0C";
            temperature.textContent = temp + unitLabel;
            conditions.textContent = description.charAt(0).toUpperCase() + description.slice(1);

            // Clear the loading message and show success
            weatherMessage.textContent = "Weather data loaded successfully.";
            weatherMessage.className = "form-message success";
        })
        .catch(function(error) {
            // Handle any errors during the API request
            weatherMessage.textContent = error.message || "An error occurred while fetching weather data.";
            weatherMessage.className = "form-message error";
        });
});
