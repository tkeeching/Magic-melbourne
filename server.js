////////////   Modules  /////////////
const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const geoJSON = require('./library/geoJSON_module');

// const SygicTravelSDK = require('sygic-travel-js-sdk/index.node')
// const apiUrl = 'https://api.sygictravelapi.com/1.2/en/';
// const clientKey = 'BNLiHyXDsUa1OhdwsHho47y6rO0HKcNa5BWnofl7';
// const stSDK: SygicTravelSDK.StSDK = SygicTravelSDK.create(apiUrl, clientKey);
// // const stSDK1 =  SygicTravelSDK.StSDK 
// // const stSDK = SygicTravelSDK.create(apiUrl, clientKey);

////////////   Middleware /////////////
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('public'));


////////////   Routes  /////////////
app.get('/', (req, res) => {
    res.render('welcome_page')
})


app.get('/index', (req, res) => {
    
    //query the API for the relevant interest
    // switch (req.params) {
    //     case food:
                    // then variables is best restaurants
    //         break;
    //     case POI:
                    // then variables is POI
    //         break;
    
    //     default:
    //         break;
    // }

    let url = "https://api.sygictravelapi.com/1.2/en/places/list?location=-37.820,144.981&query=hotels&limit=20"
    
    axios.get(url,{
        headers: {
            'x-api-key': 'BNLiHyXDsUa1OhdwsHho47y6rO0HKcNa5BWnofl7'
          }
    }).then(response =>{
        let arrOfPlaces = response.data.data.places
        let arrOfInstances = []
        arrOfPlaces.forEach(place =>{
            let instacePlave = {id: place.id, name: place.name, location: place.location, description: place.perex, image: place.thumbnail_url}
            arrOfInstances.push(instacePlave)
        })
        res.json(arrOfInstances)
    })
})

// geoJSON output
app.get('/api/geojson', (req, res) => {
    res.json(geoJSON.displayPOI());
})



////////////   SERVER LISTENNING  /////////////
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})