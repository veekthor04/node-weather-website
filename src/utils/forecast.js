request = require('request')

const forecast = (longitude, lattitude, callback) =>{
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lattitude + '&lon=' + longitude + '&APPID=447895b87bc0edae751319fb218940ea'

  request({ url, json: true}, (error,{body}) => {
    if (error) {
        callback('Unable to connect to weatherservice!', undefined)
    }else if (body.message) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, "It is currently " + (parseFloat(body.main.temp) - 273).toFixed(2) + " degrees. The description of the cloud is " + body.weather[0].description)
    }
  })
}

module.exports = forecast
