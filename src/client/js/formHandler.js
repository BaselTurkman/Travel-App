import { calculateRemainingDays } from './RemainingDays';
import { getWeather } from './getWeather';
import { getCity } from './getCity';
import { getCityPicture } from './getCityPicture';

const dateInp = document.getElementById("date");
const city = document.getElementById("city");
const cityError = document.getElementById("city_error");
const dateError = document.getElementById("date_error");

const checkAndDisplayError = (errorCondition, message, errorElement) => {
  if (errorCondition) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
    return true;
  }
  errorElement.style.display = "none";
  return false;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!isValidInput()) {
    return;
  }
  // Get the city location
  const location = await getCity();
  if (checkAndDisplayError(location.error, location.message, cityError)) {
    return;
  }
  // Get the location details
  const { lng, lat, city } = location;
  console.log(`lat : ${lat},  lng : ${lng}`)
  const date = dateInp.value;
  const remainingDays = calculateRemainingDays(date);
  // Get the weather data
  const weather = await getWeather(lng, lat, remainingDays);
  if (checkAndDisplayError(weather.error, weather.message, dateError)) {
    return;
  }
  // Get the city picture
  const cityPicture = await getCityPicture(city);
  // Update the UI with the fetched data
  updateUI(remainingDays, city, weather, cityPicture);
}

const updateUI = (remainingDays, city, weather, getCityPic) => {
  document.getElementById("days").innerHTML = `Remaining Days: ${remainingDays}`;
  document.querySelector(".cityName").innerHTML = `Location: ${city}`;
  document.querySelector(".weather").innerHTML =
    remainingDays < 7
      ? `Weather is: ${weather.description}`
      : `Weather is expected to be: ${weather.description}`;
  document.querySelector(".temp").innerHTML =
    remainingDays > 7
      ? `Forecast: ${weather.temp}°C`
      : `Temperature: ${weather.temp}°C`;
  document.querySelector(".max-temp").innerHTML =
    remainingDays > 7
      ? `Max: ${weather.app_max_temp}°C`
      : "";
  document.querySelector(".min-temp").innerHTML =
    remainingDays > 7
      ? `Min: ${weather.app_min_temp}°C`
      : "";

  const imgSrc = getCityPic.image || "fallback-image-url.jpg";
  document.querySelector(".cityPic").innerHTML =
    `<img src="${imgSrc}" alt="An image that describes the ${city} nature">`;

  document.querySelector("#details").style.display = "block";
}

const isValidInput = () => {
  dateError.style.display = "none";
  cityError.style.display = "none";
  if (!city.value) {
    cityError.style.display = "block";
    cityError.innerHTML = `You need to enter a City.`;
    return false;
  }
  if (!dateInp.value) {
    dateError.style.display = "block";
    dateError.innerHTML = "Please Enter a Valid date.";
    return false;
  }
  if (calculateRemainingDays(dateInp.value) < 0) {
    dateError.style.display = "block";
    dateError.innerHTML = "Date Should be in the Future.";
    return false;
  }
  return true;
}

export { handleSubmit };
