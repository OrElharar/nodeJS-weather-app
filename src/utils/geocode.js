const request = require("postman-request");

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${(encodeURIComponent(address))}.json?access_token=pk.eyJ1Ijoib3JlbGhhcmFyIiwiYSI6ImNrcTZheWptejBmb3gydW1tcm44dmo2OXoifQ.vJK7rB3Sazhk9z9przYciQ&limit=1`

    request({ url, json: true }, (error, response) => {
        if (error != null) {
            callback("Unable to connect server.", null);
        }
        else {
            if (response.body.features.length === 0) {
                return callback("Invalid given location.", undefined);
            } else {
                const longitude = response.body.features[0].center[0];
                const latitude = response.body.features[0].center[1];
                const location = response.body.features[0].place_name;

                callback(null, {
                    longitude,
                    latitude,
                    location
                })
            }
        }
    })
}

module.exports = geocode;