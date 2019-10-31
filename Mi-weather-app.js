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

function changeCity() {
  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityInput.value;
}

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
