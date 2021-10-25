class Forecast {
    constructor(){
        this.key = 'wOlcHgbnOxLTg3wY8cGQDULleDFO7HCU';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

     //get city info
    async updateCity(city) {
        //console.log(city);
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return { cityDets, weather };
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch (this.cityURI + query);
        const data = await response.json();

        return(data[0]);
    }

    //get weather info
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return(data[0]);
    }

   
    
}

// getCity('Manchester')
//     .then(data => {
//         return getWeather(data.Key);
//     }).then(data => {
//         console.log(data);
//     }).catch(err => console.log(err));

    


