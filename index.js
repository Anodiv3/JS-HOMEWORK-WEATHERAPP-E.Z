const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const APIKey = 'dd6929d43d6b61baabec6f8dc7a27636';

// Я поменяла города на свои потому что
// те что были в домашнем задании №6 выбивали ошибку

const citiesData = [
    { id: 2643743, name: 'London' },
    { id: 625144, name: 'Minsk' },
    { id: 698740, name: 'Odesa' },
    { id: 703448, name: 'Kyiv' },
    { id: 2759794, name: 'Amsterdam' },
    { id: 5527554, name: 'Odessa' },
    { id: 618426, name: 'Chisinau' },
  ];

const cityBackgrounds = [
    'url(https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg)',
    'url(https://myfin.by/source/thumb_484_860/1/BOZcH-Okxop4StLo4qxUn3yRsM3QnRf4.jpg)',
    'url(https://cdn.britannica.com/40/100440-050-58407CD6/State-Academic-Theatre-of-Opera-and-Ballet-1809.jpg)',
    'url(https://www.globsec.org/sites/default/files/styles/inline/public/2022-10/AdobeStock_237922991-scaled-e1666004413531.jpeg?itok=oRrVvn-5)',
    'url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1200px-KeizersgrachtReguliersgrachtAmsterdam.jpg)',
    'url(https://upload.wikimedia.org/wikipedia/commons/c/c5/Odessa_IMG_0319.JPG)',
    'url(https://upload.wikimedia.org/wikipedia/commons/f/fa/Cl%C4%83direa_fostei_Dume_Or%C4%83%C8%99ene%C8%99ti._Ast%C4%83zi_Prim%C4%83ria_%C8%99i_Consiliul_Municipal_Chi%C8%99in%C4%83u._Foto_3.jpg)',
]

const citySelector = document.querySelector("#city-selector");

citiesData.forEach(city => {
    const option = document.createElement("option");
    option.value = city.id;
    option.textContent = city.name;
    citySelector.appendChild(option);
});

function getWeather(cityId) {
    const CityRequest = `id=${cityId}&appid=${APIKey}`;

    fetch(`${BASE_URL}${CityRequest}`)
    .then((response) => response.json())
     .then((data) => {
       showWeather(data); 
    });
}

const cityNameOut = document.querySelector(".city-name");
const temperatureOut = document.querySelector(".temperature");
const descriptionOut = document.querySelector(".description");
const pressureOut = document.querySelector(".pressureOut");
const windSpeedOut = document.querySelector(".windSpeedOut");
const windDegOut = document.querySelector(".windDegOut");
const imgWindDirection = document.querySelector(".imgWindDirection");
const imageIconOut = document.querySelector(".imageIcon");

function showWeather(data) {
    let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    let windDirection = compassSector[Math.round(data.wind.deg / 22.5)];

    cityNameOut.innerHTML = `<p>${data.name}, ${data.sys.country}</p>`;
    temperatureOut.innerHTML = `<p>${Math.round(data.main.temp - 273.15)}&deg;C </p>`;
    descriptionOut.innerHTML = `<p>${data.weather[0]['description']} </p>`;
    windSpeedOut.innerHTML = `<p> ${Math.round(data.wind.speed * 3.6)}km/h </p>`
    windDegOut.innerHTML = `<p>${windDirection}</p>`
    imgWindDirection.style.transform = `rotate(${data.wind.deg}deg) scale(-1, -1)`
    pressureOut.innerHTML = `<p>${parseFloat(data.main['pressure'] * 0.02953).toFixed(2)}Hg</p>`;
    imageIconOut.innerHTML = `<p><img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}.png" alt=${data.weather[0]['main']}/></p>`;
    
    
        const cityNameBefore = document.querySelector(".city-name");
        const cityIndex = citiesData.findIndex(city => city.id === data.id);
        if (cityIndex !== -1) {
            const backgroundUrl = cityBackgrounds[cityIndex];
            cityNameBefore.style.backgroundImage = backgroundUrl;
        }

}

function firstLoadingCity() {
    const initialCityId = 2643743;
    citySelector.value = initialCityId;
    getWeather(initialCityId);
}

document.addEventListener("DOMContentLoaded", firstLoadingCity);

citySelector.addEventListener("change", () => {
    const selectedCityId = citySelector.value;
    getWeather(selectedCityId);
});