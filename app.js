const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const cityName = document.querySelector(".city-name");
const mainWeather = document.querySelector(".main-weather");
const temp = document.querySelector(".temp");
const feelsLikeTemp = document.querySelector(".feels-like-temp");
const minTemp = document.querySelector(".min-temp");
const maxTemp = document.querySelector(".max-temp");
// URL and Option object of using this weather api

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7f6862f148mshbb2313888c10321p10742bjsnd2c50a023c29",
    "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
  },
};

cityInput.addEventListener("keydown", () => {
  handleKeyDown();
});

searchBtn.addEventListener("click", () => {
  getWeather(cityInput.value);
  setTimeout(() => {
    cityInput.value = "";
  }, 2000);
});

function handleKeyDown() {
  if (event.key === "Enter") {
    getWeather(cityInput.value);
    setTimeout(() => {
      cityInput.value = "";
    }, 2000);
  }
}

const getWeather = async (cityInput) => {
  const url = `https://open-weather13.p.rapidapi.com/city/${cityInput}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    cityName.innerHTML = data.name;
    mainWeather.innerHTML = data.weather[0].main;
    temp.innerHTML = `Temp: ${data.main.temp} °F or ${(
      ((data.main.temp - 32) * 5) /
      9
    ).toFixed(2)} C°`;
    feelsLikeTemp.innerHTML = `Feels like: ${data.main.feels_like} °F or ${(
      ((data.main.feels_like - 32) * 5) /
      9
    ).toFixed(2)} C°`;
    minTemp.innerHTML = `Min temp: ${data.main.temp_min} °F or ${(
      ((data.main.temp_min - 32) * 5) /
      9
    ).toFixed(2)} C°`;
    maxTemp.innerHTML = `Max temp: ${data.main.temp_max} °F or ${(
      ((data.main.temp_max - 32) * 5) /
      9
    ).toFixed(2)} C°`;

    const body = document.querySelector("body");

    if (data.weather[0].main === "Clouds") {
      body.style.backgroundImage =
        "url(https://media.istockphoto.com/id/512218646/photo/storm-sky-rain.jpg?s=612x612&w=0&k=20&c=RoUDM9BMwqW8NkPXjzAzlDKCHPOmdZhmmeT3jGA2EaM=)";
      body.style.backgroundSize = "cover";
    } else if (data.weather[0].main === "Clear") {
      body.style.backgroundImage =
        "url(https://media.istockphoto.com/id/508544168/photo/clear-blue-sky-background.jpg?s=612x612&w=0&k=20&c=VTivHpfbko-pObbgk-7eILKHAku_fGtBWtfebS0zxV0=)";
      body.style.backgroundSize = "cover";
    } else if (data.weather[0].main === "Rain") {
      body.style.backgroundImage =
        "url(https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=600)";
      body.style.backgroundSize = "cover";
    }
  } catch (error) {
    console.error(error);
  }
};
