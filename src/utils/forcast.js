const request = require("postman-request");

const forcast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3317c20ff62fbe23375dd3d6505d37e4&query=${longitude},${latitude}&units=m`;

    request({ url, json: true }, (error, response) => {
        if (error != null) {
            callback("Unable to connect server.", null)
        } else {
            if (response.body.current == null) {
                callback("Invalid given cordinates.", null)
            } else {
                const temp = response.body.current.temperature;
                const precip = response.body.current.precip
                const description = response.body.current.weather_descriptions[0];
                callback(null, {
                    temp,
                    precip,
                    description
                })
            }
        }

    })
}

module.exports = forcast;