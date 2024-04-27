const apiKey = "";
const searchBtn = document.getElementById("search-btn");
const searchedCity = document.getElementById("searched-city");
const cardTitle = document.getElementById("card-title");
const cardText = document.getElementById("card-text");
const cardImage = document.getElementById("card-image");
const card = document.getElementById("card");

searchBtn.addEventListener("click", () => {
  let city = searchedCity.value;
  searchedCity.value = "";

  if (city.trim() !== "") {
    const apiUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error("Error fetching");
        }
        return res.json();
      })
      .then(data => {
        let temperature = Math.round(data.data[0].temp);
        let windSpeed = Math.round(data.data[0].wind_spd * 3.6);
        let humidity = data.data[0].rh;
        let description = data.data[0].weather.description;
        let image = data.data[0].weather.icon;
        let windDirection = data.data[0].wind_cdir;
        let precipitation = data.data[0].precip;

        card.style.display = 'block';

        cardImage.src = `https://www.weatherbit.io/static/img/icons/${image}.png`;
        cardTitle.textContent = city + " | " + description + ", " + temperature + "\u00B0";
        cardText.innerHTML = "Wind: " + windDirection + ", " + windSpeed + " km/h" + "<br>" + "Humidity: " + humidity + "%" + "<br>" + "Precipitation: " + precipitation + "%";
      })
      .catch(err => console.log(err));
  } else {
    alert("Search cannot be empty");
  }
});