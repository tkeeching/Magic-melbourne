////////////   Modules  /////////////
const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

const SygicTravelSDK = require('sygic-travel-js-sdk/index.node')
const apiUrl = 'https://api.sygictravelapi.com/1.2/en/';
const clientKey = 'BNLiHyXDsUa1OhdwsHho47y6rO0HKcNa5BWnofl7';
const stSDK1 =  SygicTravelSDK.StSDK 
const stSDK = SygicTravelSDK.create(apiUrl, clientKey);

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
    axios.get(url).then(response =>{
        res.json(response.data)
    })
    // res.render('index')
})






////////////   SERVER LISTENNING  /////////////
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})