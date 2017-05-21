const yargs = require('yargs');
const request = require('request');
const geocode = require('./geocode');
const weather = require('./weather')
const weather2 = require('./weather2')

const argv = yargs
    .options({
        a: {
            demand:true,
            alias: 'address',
            describe: 'Address for checking getWeather',
            string: true
        }
    })
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage)
    } else {
        //console.log(JSON.stringify(results, undefined, 2))
        weather2.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
            console.log("Summary:", weatherResults.summary, ", ", weatherResults.temperature)}
        });
        //weather2.getWeather(results.latitude, results.longitude)
    }
});
