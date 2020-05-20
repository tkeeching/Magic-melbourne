////////////   Modules  /////////////
const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const geoJSON = require('./library/geoJSON_module');


////////////   Middleware /////////////
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('public'));


////////////   Routes  /////////////
app.get('/', (req, res) => {
    res.render('welcome_page')
})


app.get('/api/index', (req, res) => {
    
    // res.send('hello')
    let url = `https://api.sygictravelapi.com/1.2/en/places/list?parents=city:381&categories=${ req.query.category }&limit=20`

    // res.send(url)
    
    axios.get(url,{
        headers: {
            'x-api-key': 'BNLiHyXDsUa1OhdwsHho47y6rO0HKcNa5BWnofl7'
          }
    }).then(response =>{
        
        // res.json(response.data)

        // clean up the date to provide us the relevant information
        let arrOfPlaces = response.data.data.places
        let arrOfInstances = []

        arrOfPlaces.forEach(place =>{
            let instancePlace = {id: place.id, name: place.name, location: place.location, description: place.perex, image: place.thumbnail_url}
            arrOfInstances.push(instancePlace)
        })
 
        let geoJData = []
        arrOfInstances.forEach(instance => {
            geoJData.push(geoJSON.convertToGeoJSON(response.data));
        })

        // res.render('index', {
        //     attractions: arrOfInstances,
        //     geoJData: geoJData[0]
        // })
        res.json(geoJData[0])
    })
})

app.get('/index', (req, res) => {
    
    // res.send('hello')
    let url = `https://api.sygictravelapi.com/1.2/en/places/list?parents=city:381&categories=${ req.query.category }&limit=20`

    // res.send(url)
    
    axios.get(url,{
        headers: {
            'x-api-key': 'BNLiHyXDsUa1OhdwsHho47y6rO0HKcNa5BWnofl7'
          }
    }).then(response =>{
        
        // res.json(response.data)

        // clean up the date to provide us the relevant information
        let arrOfPlaces = response.data.data.places
        let arrOfInstances = []

        arrOfPlaces.forEach(place =>{
            let instancePlace = {id: place.id, name: place.name, location: place.location, description: place.perex, image: place.thumbnail_url}
            arrOfInstances.push(instancePlace)
        })
 
        let geoJData = []
        arrOfInstances.forEach(instance => {
            geoJData.push(geoJSON.convertToGeoJSON(response.data));
        })

        let greeting = "hello"

        res.render('index', {
            attractions: arrOfInstances,
            geoJData: geoJData[0],
            greeting: greeting
        })
    })
})

// geoJSON output
app.get('/api/geojson', (req, res) => {
    res.json(geoJSON.convertToGeoJSON());
})

////////////   SERVER LISTENNING  /////////////
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})