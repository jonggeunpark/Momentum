const weather = document.querySelector(".js-weather");

const API_KEY = "1eca523e298cc51592986107705923a2"
const COORDS = "coords"

function getWeather(lat, lng)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
    .then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;

        weather.innerText = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const coordsObj = {
        latitude,
        longitude,
    };
    
    getWeather(latitude,longitude);
    saveCoords(coordsObj);
}

function handleGeoError()
{
    console.log("cant access location");
}

function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS);
    
    if(loadedCoords === null)
    {
        askForCoords();
    } 
    else
    {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();

