const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties; constants must be same name as the properties keys
    const { cityDets, weather } = data;


    //update detail template

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night&day images and icons

    let timeSrc = (weather.IsDayTime) ? 'icons/day.svg' : 'icons/night.svg';
    time.setAttribute('src', timeSrc);
    let iconSrc = (weather.WeatherIcon);
    icon.setAttribute('src', `icons/${iconSrc}.svg`);



    //remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

cityForm.addEventListener('submit', e => {

    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city)
        .then (data =>updateUI(data))
        .catch (err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then (data => updateUI(data))
        .catch(err => console.log(err));
} 