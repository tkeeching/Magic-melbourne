////////////   Modules  /////////////
const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

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

// MediaWiki API
app.get('/api/mediawiki', (req, res) => {
    // wikipedia url
    let url2 = "https://en.wikipedia.org/w/api.php"; 

    // wikivoyage url
    let url = "https://wikitravel.org/wiki/en/api.php";

    // search nearby places by coordinates
    const params2 = {
        action: "query",
        generator: "geosearch",
        prop: "coordinates|pageimages",
        ggscoord: "-37.8267882|144.9559848",
        format: "json"
    };

    // search page by text
    const params = {
        action: "opensearch",
        search: "melbourne",
        limit: "20",
        namespace: "0",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    axios.get(url).then((apiRes) => {
        res.json(apiRes.data);
    })
})





////////////   SERVER LISTENNING  /////////////
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})