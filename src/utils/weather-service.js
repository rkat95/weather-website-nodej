const request = require("request");
const geocode = require("./geocode");

getCurrentForecast = (coordinates, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5216219e3cd649b60fb221ad79e998d5&query=${coordinates.latitude},${coordinates.longitude}`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) console.log("Unable to connect to weather service");
    else if (body.error) {
      callback(undefined, body.error.info);
    } else {
      callback(body.current);
    }
  });
};

getWeatherForecast = (address, callback) => {
  geocode(address, (locationData, err) => {
    if (!err) {
      getCurrentForecast(
        locationData,
        (
          { weather_descriptions, temperature, feelslike, observation_time },
          err
        ) => {
          if (!err) {
            console.log();
            callback({
              forecast: weather_descriptions[0],
              temperature,
              feelslike,
              observation_time,
              location: locationData.location,
            });
          } else {
            callback(undefined, err);
          }
        }
      );
    } else {
      callback(undefined, err);
    }
  });
};

module.exports = {
  getWeatherForecast: getWeatherForecast,
};
