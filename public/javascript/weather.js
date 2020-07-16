const url = 'http://api.openweathermap.org/data/2.5/weather?lat=-37.8136&lon=144.9631&appid=5bda63076664799730f7a2c28aa82b2b'

axios.get(url).then(res =>  {
    
    const temp = res.data.main.temp;
    const description = res.data.weather[0].description;
    const icon = res.data.weather[0].icon;

    const displayTemp = document.querySelector(".weather_temp");
    const dislayDescription = document.querySelector(".weather_description");
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    const kelvin = 273;
    const  navBarHeading = document.querySelector(".navbar_heading");

    displayTemp.textContent = Math.round(temp - kelvin) + "°C";
    dislayDescription.textContent = description;
    const iconElem = document.createElement("img");
    iconElem.classList.add('header_icon');
    iconElem.setAttribute("src", iconUrl);
    dislayDescription.appendChild(iconElem);
})   