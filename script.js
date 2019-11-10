const today = new Date();
const currentDate = document.querySelector("p");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const shortDays = days.map(item => ({
  name: item,
  shortName: item.slice(0, 3)
}));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const day = days[today.getDay()];
const month = months[today.getMonth()];
const date = today.getDate();
const year = today.getFullYear();
const hours = today.getHours();
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

currentDate.innerHTML = `${hours}:${minutes}  ${day} ${date}, ${month} ${year}`;

function showForecast(response) {
  const nextDayTemp = document.querySelector("#next-day-temp");
  nextDayTemp.innerHTML = Math.round(response.data.list[12].main.temp) + "º";
  const nextDayIcon = document.querySelector("#next-day-icon");
  nextDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[12].weather[0].icon}@2x.png`
  );

  const secondDayTemp = document.querySelector("#second-day-temp");
  secondDayTemp.innerHTML = Math.round(response.data.list[20].main.temp) + "º";
  const secondDayIcon = document.querySelector("#second-day-icon");
  secondDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[20].weather[0].icon}@2x.png`
  );

  const thirdDayTemp = document.querySelector("#third-day-temp");
  thirdDayTemp.innerHTML = Math.round(response.data.list[28].main.temp) + "º";
  const thirdDayIcon = document.querySelector("#third-day-icon");
  thirdDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[28].weather[0].icon}@2x.png`
  );

  const forthDayTemp = document.querySelector("#forth-day-temp");
  forthDayTemp.innerHTML = Math.round(response.data.list[36].main.temp) + "º";
  const forthDayIcon = document.querySelector("#forth-day-icon");
  forthDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[36].weather[0].icon}@2x.png`
  );
}

function search(searchCity) {
  const apiKey = "a2df7199551cc39797a0929621d2b43a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  const fApiKey = "a2df7199551cc39797a0929621d2b43a";
  const fApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${fApiKey}&units=metric`;
  axios.get(fApiUrl).then(showForecast);
}

function changeCity(event) {
  event.preventDefault();
  const cityInput = document.querySelector("#city-input");
  const h2 = document.querySelector("h2");
  h2.innerHTML = cityInput.value;
  search(cityInput.value);
}

const citySubmit = document.querySelector("#city-form");
citySubmit.addEventListener("submit", changeCity);

function changeToCelcius() {
  const temperature = document.querySelector("#temperature");
  const celciusLink = document.querySelector("#celcius");
  celciusLink.classList.add("active");
  const cLink = document.querySelector("#farn");
  cLink.classList.remove("active");
  temperature.innerHTML = Math.round(cecliusTemperature);
}

function changeToFarn(event) {
  event.preventDefault();
  const temperature = document.querySelector("#temperature");
  const farnLink = document.querySelector("#farn");
  farnLink.classList.add("active");
  const fLink = document.querySelector("#celcius");
  fLink.classList.remove("active");
  temperature.innerHTML = Math.round((cecliusTemperature * 9) / 5 + 32);
}

const celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", changeToCelcius);

const farnLink = document.querySelector("#farn");
farnLink.addEventListener("click", changeToFarn);

let cecliusTemperature = null;

function showTemperature(response) {
  const temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  const city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;

  const weatherIcon = document.querySelector("#weatherIcon");
  cecliusTemperature = response.data.main.temp;

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let count = today.getDay() + 1;
  if (count === 7) {
    count = 1;
  }

  document.getElementById("next-day").innerHTML = shortDays[count].shortName;
  count++;
  document.getElementById("second-day").innerHTML = shortDays[count].shortName;
  count++;
  document.getElementById("third-day").innerHTML = shortDays[count].shortName;
  count++;
  document.getElementById("forth-day").innerHTML = shortDays[count].shortName;
}

search("Barcelona");
