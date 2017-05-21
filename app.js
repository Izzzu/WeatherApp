const yargs = require('yargs');
const request = require('request');
const geocode = require('./geocode');
const weather = require('./weather')
const weather2 = require('./weather2')

const express = require('express')
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);


app.set('port', (process.env.PORT || 4000));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/'));


http.listen(app.get('port'), () => {
  console.log('WeatherApp listening on *:' + app.get('port'));
})

io.on('connection', (socket) => {


  socket.on('address', (address) => {
    geocode.geocodeAddress(address, (errorMessage, results) => {
        if(errorMessage) {
            console.log(errorMessage);
            socket.emit('errorMessage', errorMessage);
        } else {
            //console.log(JSON.stringify(results, undefined, 2))
            weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                if (errorMessage) {
                    console.log(errorMessage);
                    socket.emit('errorMessage', errorMessage);
                } else {
                console.log("Weather for ",results.addres," : ",weatherResults.summary,
                ",", weatherResults.temperature," Celsius Degree");

                socket.emit('weatherInfo', {
                  address: results.address,
                  summary: weatherResults.summary,
                  temperature: weatherResults.temperature
                })

              }
            });
            //weather2.getWeather(results.latitude, results.longitude)
        }
    });

  })

})
