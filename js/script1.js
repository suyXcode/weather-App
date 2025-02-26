// Define an asynchronous function named 'w'
async function w() {
    // Get the value of the input field where the user enters the city name
    const city = document.querySelector('#search > input').value;
    
    // Check if the input field is empty
    if (city === "") {
        // If the input is empty, show an alert message
        alert("Please enter city name");
    } else {
        // Define the API key for OpenWeatherMap
        const apikey = "1d066b43f522d13a0b12ebb781fd9405";
        // Create the URL for the API request using the city name and API key
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
        
        try {
            // Make an HTTP request to the weather API and wait for the response
            let res = await fetch(url);
            // Check if the response is not okay (status code is not in the 200-299 range)
            if (!res.ok) {
                // Throw an error if the city is not found or any other issue occurs
                throw new Error('City not found');
            }

            // Parse the response data to JSON format
            let data = await res.json();
            
            // Update the temperature element with the temperature in Celsius
            document.getElementById('temp').innerHTML = (Math.round(data.main.temp)) + " ℃";
            // Update the city element with the name of the city
            document.getElementById('city').innerHTML = data.name;
            // Update the wind speed element with the wind speed in Km/h
            document.getElementById('wind').innerHTML = data.wind.speed + " Km/h";
            // Update the humidity element with the humidity percentage
            document.getElementById('humidity').innerHTML = data.main.humidity + "%";
            
            // Extract the main weather condition and description from the API response
            let weatherCondition = data.weather[0].main;
            let weatherDescription = data.weather[0].description;
            
            // Get the HTML element for displaying the weather icon
            let weatherIcon = document.getElementById('weather-icon');
            
            // Change the weather icon based on the detailed weather description
            if (weatherDescription === "clear sky") {
                weatherIcon.src = "./img/clear.png"; // Clear sky icon
            } else if (weatherDescription === "few clouds" || weatherDescription === "scattered clouds") {
                weatherIcon.src = "./img/clouds.png"; // Few or scattered clouds icon
            } else if (weatherDescription === "broken clouds" || weatherDescription === "overcast clouds") {
                weatherIcon.src = "./img/cloud1.png"; // Broken or overcast clouds icon
            } else if (weatherDescription === "shower rain" || weatherDescription === "light rain") {
                weatherIcon.src = "./img/drizzle.png"; // Light rain or drizzle icon
            } else if (weatherDescription === "moderate rain" || weatherDescription === "heavy intensity rain") {
                weatherIcon.src = "./img/rain.png"; // Moderate or heavy rain icon
            } else if (weatherCondition === "Snow") {
                weatherIcon.src = "./img/snow.png"; // Snow icon
            } else if (weatherDescription === "haze") {
                weatherIcon.src = "./img/haze.png"; // Haze icon
            } else if (weatherDescription === "mist") {
                weatherIcon.src = "./img/mist.png"; // Mist icon
            } else {
                // Default to haze icon if no specific condition is matched
                weatherIcon.src = "./img/haze.png";
            }
            
            // Capitalize the first letter of the weather description and update the HTML element
            document.getElementById('weather-description').innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
        } catch (error) {
            // Show an alert if there is an error (e.g., city not found)
            alert("Error: " + error.message);
        }
    }
}
