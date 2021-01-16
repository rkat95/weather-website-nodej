const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmVlbWs5NSIsImEiOiJja2pwcmFtdGczOXVwMnpvNzZhaHR5eDRxIn0.KEcvR2xLb6qtAfdmOmqL2Q&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(undefined, "Unable to connect to weather service");
    } else if (response.body.features.length == 0) {
      callback(undefined, "Unable to find location");
    } else {
      const locationInfo = response.body.features[0];

      callback({
        latitude: locationInfo.center[1],
        longitude: locationInfo.center[0],
        location: locationInfo.place_name,
      });
    }
  });
};

module.exports = geocode;
