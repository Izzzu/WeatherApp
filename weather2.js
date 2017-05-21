var DarkSky = require('forecast.io');

var options = {
    APIKey: 'b5bc3723a7651d0a2bd74764c22c46c2',
    timeout: 1000
}


var darksky = new DarkSky(options);


var getWeather = (latitude, longitude, callback) => {
    darksky.get(latitude, longitude, function (err, res, body) {
        if (err) callback(err);
        //console.log('res: ' + JSON.stringify(res.currently));
        callback(undefined, {
            temperature: body.currently.temperature,
            summary: body.currently.summary
        });
    });
}


module.exports = {getWeather}