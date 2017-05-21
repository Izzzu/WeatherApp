const request = require('request')

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');

        } else if (body.status === 'ZERO_RESULTS') {
            request({
                url:`https://maps.googleapis.com/maps/api/geocode/json?address=Sosnowiec`,
                json:true
            }, (e, r, b) => {
                if (e || b.status === 'ZERO_RESULTS') {
                    callback('Unable to find that address.');

                }
               else {
                    callback(undefined, {
                        address: b.results[0].formatted_address,
                        latitude: b.results[0].geometry.location.lat,
                        longitude: b.results[0].geometry.location.lng
                    }); }

            });

        } else if (response.statusCode !== 200) {
          callback('Wrong address');
        }else {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }

    });


}



module.exports = {geocodeAddress}
