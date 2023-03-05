// DO NOT show API KEY on your JS File
const API_KEY = "503cf8833cadbcab695993f4582b0ad1";

const loadTemperature = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayTemperature(data);
    } catch (error) {
        console.log(error);
    }
};

const displayTemperature = (data) => {
    const timeZone = data.timezone / 3600;
    setInnerTextById("city", data.name);
    setInnerTextById("temperature", data.main.temp);
    setInnerTextById("feels-like", data.main.feels_like);
    setInnerTextById("condition", data.weather[0].main);
    setInnerTextById(
        "time-zone",
        isInt(timeZone) && timeZone > 0
            ? `+${timeZone}:00`
            : timeZone < 0
            ? `${timeZone}:30`
            : `+${Math.floor(timeZone)}:30`
    );
    // console.log(data);
};

const setInnerTextById = (id, text) => {
    const temperature = document.getElementById(id);
    temperature.innerText = text;
};

const isInt = (n) => {
    if (n.length == 0) {
        return false;
    }
    return !isNaN(n % 1) && n % 1 == 0;
};

document.getElementById("btn-search").addEventListener("click", function () {
    const searchField = document.getElementById("search-field");
    const city = searchField.value;

    loadTemperature(city);
});

loadTemperature("hawaii");
