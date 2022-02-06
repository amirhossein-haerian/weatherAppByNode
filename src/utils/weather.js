const path = require('path');

const { default: axios } = require('axios');
const config = require(path.join(__dirname, '../config'));

const weather = (geoData, callback) => {
    axios.get(`${config.weather.API_ROOT}current`, {
        params: {
            access_key: config.weather.API_KEY,
            query: `${geoData.lat}, ${geoData.long}`,
        }
    }).then((result) => {
        const weatherData = result.data;
        callback({
            weatherDescription: weatherData.current.weather_descriptions[0], 
            temperature: weatherData.current.temperature,
            feelslike: weatherData.current.feelslike
        }, undefined);
    }).catch(error => {
        if(error.response){
            callback(undefined, {message: 'Unable to find the weather data!'});
        }else if(error.request){
            callback(undefined, {message: 'Unable to connect to weather service!'});
        }
    })
}

module.exports = weather;