// api key --> 4a5ad140071afe948a370579542a990e

// fetch data function

const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// getting search field , spinner , weather details and error text,div
const searchField = document.getElementById("search-field");
const spinner = document.getElementById("spinner");
const weatherDetails = document.getElementById("weather-details");
const errorText = document.getElementById("error-text");
const errorMessageDiv = document.getElementById("error-div");

//count for default weather
let count = 0;

// load data

document.getElementById("search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const searchText = searchField.value;
  if (searchText.length > 0) {
    if (count === 0) {
      document.getElementById("default-weather").classList.add("d-none");
      count++;
    }
    weatherDetails.textContent = "";
    errorMessageDiv.textContent = "";
    spinner.classList.remove("d-none");
    loadData();
  } else {
    errorText.classList.remove("invisible");
    searchField.classList.add("border-2", "border-danger");
  }
});

// form empty text error handle
document.getElementById("search-field").addEventListener("blur", () => {
  errorText.classList.add("invisible");
  searchField.classList.remove("border-2", "border-danger");
});

const loadData = () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchField.value}&appid=4a5ad140071afe948a370579542a990e`;
  fetchData(url)
    .then((data) => displayData(data))
    .finally(() => {
      searchField.value = "";
    });
};

// display data

const displayData = (data) => {
  spinner.classList.add("d-none");
  weatherDetails.textContent = "";
  try {
    if (data.cod == 404) {
      throw errorMessage;
    } else {
      const {
        name,
        main: { temp },
        sys: { country },
      } = data;
      const { description, icon } = data.weather[0];
      const detailDiv = document.createElement("div");
      detailDiv.innerHTML = `<div class="text-white text-center">
      <img
        class="image"
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt=""
      />
      <h1>${name}</h1>
      <h2 class="fw-normal" >${country}</h2>
      <h3><span>${(temp - 273).toFixed(2)}</span>°C</h3>
      <h1 class="lead">${description}</h1>
    </div>`;
      weatherDetails.appendChild(detailDiv);
    }
  } catch (error) {
    error();
  }
};

// //function for displaying error message.
const errorMessage = () => {
  weatherDetails.textContent = "";

  errorMessageDiv.innerHTML = ` <div class="card m-auto p-5 bg-primary text-white" style="width: 18rem">
          <h5 class="card-title">Dear Sir/Ma'am,</h5>
          <p class="card-text">
            Your search --<b>${searchField.value}</b>-- did not match any of our location. Please enter a
            correct location.
          </p>
        </div>`;
};
