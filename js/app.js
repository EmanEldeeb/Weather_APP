const findCityInput = document.getElementById("find_city_tem");
const findBtn = document.getElementById("find_btn");
const forms = document.querySelectorAll("form");
const todayName = document.getElementById("today_day");
const cityName = document.querySelector(".town");
const todayTemp = document.querySelector(".temp_degree span");
const todayImage = document.querySelector(".temp_img img");
const todayState = document.querySelector(".today_body .state");
const moisture = document.querySelector(".today_body #moisture");
const windSpeed = document.querySelector(".today_body #widn");
const windDirection = document.querySelector(".today_body #direction");
const nextDayName = document.querySelectorAll(".box .head");
const nextDayMaxTemp = document.querySelectorAll(".box #max_tem_degree .tem");
const nextDayMinTemp = document.querySelectorAll(".box #min_tem_degree .tem");
const nextDayState = document.querySelectorAll(".box .next_state");
const nextDayImg = document.querySelectorAll(".box #next_state_img");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

findBtn.addEventListener("click", getCityName);

findCityInput.addEventListener("input", getCityName);

async function getWeather(city = "alex") {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=ce4808e705394710af8222734232108&q=${city}&days=3`;
  const response = await fetch(url);
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}
getCityName();

async function getCityName() {
  let cityData;
  if (findCityInput.value.length >= 3) {
    cityData = await getWeather(findCityInput.value);
  } else {
    cityData = await getWeather("alex");
  }

  console.log("errrrrrrrrr", cityData.error);
  if (!cityData.error) {
    switchTodayInfo(cityData);
    switchNextDaysInfo(cityData);
  }
}

function switchTodayInfo(city) {
  cityName.textContent = city?.location?.name;
  todayTemp.textContent = city?.current?.temp_c;
  todayImage.src = `https:${city?.current?.condition?.icon}`;
  todayState.textContent = city?.current?.condition?.text;
  moisture.textContent = city?.current?.humidity;
  windDirection.textContent = city?.current?.wind_dir;
  windSpeed.textContent = city?.current?.wind_kph;
  getTodayDate();
}

function getTodayDate() {
  let todayDate = new Date();
  todayName.textContent = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  document.querySelector(".today .today_num").textContent = todayDate.getDate();
  document.querySelector(".today .today_month").textContent =
    todayDate.toLocaleDateString("en-US", { month: "long" });
}

function switchNextDaysInfo(city) {
  let nextdays = city.forecast.forecastday;
  console.log(nextdays);

  for (let i = 1; i < nextdays.length; i++) {
    let nextDate = new Date(nextdays[i].date);
    nextDayName[i - 1].textContent = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    nextDayMaxTemp[i - 1].textContent = nextdays[i]?.day?.maxtemp_c;
    nextDayMinTemp[i - 1].textContent = nextdays[i]?.day?.mintemp_c;
    nextDayState[i - 1].textContent = nextdays[i]?.day?.condition?.text;
    nextDayImg[i - 1].src = nextdays[i]?.day?.condition?.icon;
  }
}
