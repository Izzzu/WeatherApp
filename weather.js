const request = require('request');


var getWeather = (lat, lon, callback) => {
    request({
        url: `https://api.darksky.net/forecast/b5bc3723a7651d0a2bd74764c22c46c2/${lat},${lon}?units=si`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io server.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.currently.summary
            });
        }
    })
}



module.exports = {getWeather}
