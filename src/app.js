const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index',{
    title: 'Weather App',
    name: 'Victor Ade'
  })
})

app.get('/about',(req, res) => {
  res.render('about',{
    title: 'About',
    name: 'Victor Ade',
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    title: 'Help',
    name: 'Victor Ade',
    message: 'This site contains 3 pages'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {longitude,lattitude,location}={} ) => {
    if (error){
      return res.send({ error })
    }

    forecast(longitude,lattitude, (error, forecastData) => {
      if (error){
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      })

    })

  })

})

app.get('/products', (req,res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: 'Help',
    name: 'Victor Ade',
    message: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404',{
    title: 'Weather App',
    name: 'Victor Ade',
    message: 'My 404 page'
  })
})

app.listen(3000, () => {
  console.log('server is up on port 3000.')
})
 