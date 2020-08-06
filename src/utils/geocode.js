const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmVla3Rob3IwNCIsImEiOiJja2I2bnFtaDUwMGd4MnFsM2swZjRkd3o2In0.1AsW6QT-uNhEVus71XnCzw&limit=1'

  request({url, json: true }, (error, {body}) => {
    if (error){
      callback('Unable to connect to mapbox', undefined)
    }else if (body.features.length == 0) {
      callback('Unable to find matching location', undefined)
    }
    else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
