const path = require('path');

const { default: axios } = require('axios');
const config = require(path.join(__dirname, '../config'));

const geocode = (cityName, callback) => {
    axios.get(`${config.map.API_ROOT}${encodeURIComponent(cityName)}.json`, {
        params: {
            access_token: config.map.API_KEY,
            limit: 1
        }
    }).then(result => {
        if(!result.data.features || !result.data.features.length) {
            callback(undefined, {message: 'Unable to find location!'});
            return
        }
        const mapData = result.data.features[0];
        callback({lat: mapData.center[1], long: mapData.center[0], location: mapData.place_name}, undefined);
    }).catch(error => {
        if(error.response){
            callback(undefined, {message: 'Unable to find location!'});
        }else if(error.request){
            callback(undefined, {message: 'Unable to connect to location service!'});
        }else{
            callback(undefined, {message: error});
        }
    })
}

module.exports = geocode;