// task 1 --------------------
const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "3d904b63f5a49da63c8fd5ef28551ddb"
}

let allOptions = document.querySelector('select');


allOptions.addEventListener("change", function () {
    document.querySelectorAll('.background-img').forEach((n, i) => {
        n.classList.toggle('active', i === this.selectedIndex);
    });
})




function getWeather() {
	const cityId = document.querySelector('#city').value;
    console.log(cityId);
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);
}

let convertTimeSunrise = (data) => {
    let unix_time = new Date(data.sys.sunrise*1000);
    hh = unix_time.getHours();
    h = hh;
    min = ('0' + unix_time.getMinutes()).slice(-2);
    ampm = 'AM'; //time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    time = h + ':' + min + ' ' + ampm;
    return time;
}

let convertTimeSunset = (data) => {
    let unix_time = new Date(data.sys.sunset*1000);
    hh = unix_time.getHours();
    h = hh;
    min = ('0' + unix_time.getMinutes()).slice(-2);
    ampm = 'AM';
    //time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    time = h + ':' + min + ' ' + ampm;
    return time;
}

function showWeather(data) {
	console.log(data);
    let kindOfWeather = data.weather[0].main;
    document.querySelector(".middle__title").innerHTML = data.name;
    document.querySelector(".icon-subtitle").innerHTML = data.weather[0].main;
    document.querySelector(".description-temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description-feels__value").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".description-sunrise__value").innerHTML = convertTimeSunrise(data);
    document.querySelector(".description-sunset__value").innerHTML = convertTimeSunset(data);
    document.querySelector(".sidebar-hum__value").innerHTML = data.main.humidity;
    document.querySelector(".sidebar-wind__value").innerHTML = data.wind.deg;
    document.querySelector(".temp__max-value").innerHTML = data.main.temp_max + "°C";
    document.querySelector(".temp__min-value").innerHTML = data.main.temp_min+ "°C";
    document.querySelector(".pressure-value").innerHTML = data.main.pressure;
    document.querySelector(".weather-desc-value").innerHTML = data.weather[0].description;

    if ( kindOfWeather == 'Clear') {
        document.querySelector(".weather-icon").innerHTML = '<img src="img/weather-icon2.png" alt="weather-icon" class="weather-img">';
    } else if ( kindOfWeather == 'Clouds') {
        document.querySelector(".weather-icon").innerHTML = '<img src="img/weather-icon4.png" alt="weather-icon" class="weather-img">';
    } else if ( kindOfWeather == 'Rain') {
        document.querySelector(".weather-icon").innerHTML = '<img src="img/weather-icon1.png" alt="weather-icon" class="weather-img">';
    } else if ( kindOfWeather == 'Snow') {
        document.querySelector(".weather-icon").innerHTML = '<img src="img/weather-icon5.png" alt="weather-icon" class="weather-img">';
    } else if ( kindOfWeather == 'Drizzle') {
        document.querySelector(".weather-icon").innerHTML = '<img src="img/weather-icon1.png" alt="weather-icon" class="weather-img">';
    } else if ( kindOfWeather == 'Thunderstorm') {
        document.querySelector(".weather-icon").innerHTML = '<img src="img/weather-icon3.png" alt="weather-icon" class="weather-img">';
    } else {
        document.querySelector(".weather-icon").innerHTML = '<img src="img/weather-icon6.png" alt="weather-icon" class="weather-img">';
    }
    
}



getWeather();
document.querySelector('#city').addEventListener('change', getWeather); 

