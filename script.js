document.getElementById("getWeather").addEventListener("click", function() {
    const cityValue = document.getElementById("citySelect").value;
    if (!cityValue) {
        alert("Please select a city!");
        return;
    }

    const [lat, lon] = cityValue.split(",");
    const url = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastDiv = document.getElementById("forecast");
            forecastDiv.innerHTML = ""; // Clear old results

            data.dataseries.forEach(day => {
                const date = new Date(day.date.toString().replace(
                    /^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3'
                ));
                
                const dayDiv = document.createElement("div");
                dayDiv.classList.add("day");

                dayDiv.innerHTML = `
                    <h4>${date.toDateString()}</h4>
                    <p>Weather: ${day.weather}</p>
                    <p>Temp: ${day.temp2m.min}°C - ${day.temp2m.max}°C</p>
                    <p>Wind: ${day.wind10m_max} m/s</p>
                `;
                forecastDiv.appendChild(dayDiv);
            });
        })
        .catch(err => {
            console.error(err);
            alert("Error fetching weather data");
        });
});
