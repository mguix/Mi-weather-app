let today = new Date();

let currentDate = document.querySelector("p");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
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
let day = days[today.getDay()];
let month = months[today.getMonth()];
let date = today.getDate();
let year = today.getFullYear();
let hours = today.getHours();
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

currentDate.innerHTML = `${hours}:${minutes}  ${day} ${date}, ${month} ${year}`;

function search(searchCity) {
  let apiKey = "a2df7199551cc39797a0929621d2b43a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityInput.value;
  search(cityInput.value);
}

search("Barcelona");

let citySubmit = document.querySelector("#city-form");
citySubmit.addEventListener("submit", changeCity);

function changeToCelcius() {
  let temperature = document.querySelector("#temperature");
  let celciusLink = document.querySelector("#celcius");
  celciusLink.classList.add("active");
  let cLink = document.querySelector("#farn");
  cLink.classList.remove("active");
  temperature.innerHTML = 30;
}

function changeToFarn(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let farnLink = document.querySelector("#farn");
  farnLink.classList.add("active");
  let fLink = document.querySelector("#celcius");
  fLink.classList.remove("active");
  temperature.innerHTML = Math.round(30 * 9) / 5 + 32;
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", changeToCelcius);

let farnLink = document.querySelector("#farn");
farnLink.addEventListener("click", changeToFarn);

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let currentDays = [
    "Sun",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let nextDay = document.querySelector("#next-day");
  nextDay.innerHTML = currentDays[today.getDay() + 1];
  let secondDay = document.querySelector("#second-day");
  secondDay.innerHTML = currentDays[today.getDay() + 4];
  if (secondDay > 6) {
    return 0;
  }
}
