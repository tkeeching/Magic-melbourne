////////////   Modules  /////////////
const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const geoJSON = require('./library/geoJSON_module');
const session = require('express-session');
const { v4: genuuid } = require('uuid');


////////////   Middleware /////////////
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  name: 'SessionCookie',
  genid: function (req) {
    console.log('session id created')
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'tom cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}))

var sess;
////////////   Routes  /////////////
app.get('/', (req, res) => {
  sess = req.session;
  sess.starredItems = [];
  res.render('welcome_page', {
    currentUserId: sess.id,
    starredItems: sess.starredItems
  })
})


app.get('/index', (req, res) => {
  sess = req.session;
  // res.send('hello')
  let url = `https://api.sygictravelapi.com/1.2/en/places/list?parents=city:381&categories=${req.query.category}&limit=20`

  // res.send(url)

  axios.get(url, {
    headers: {
      'x-api-key': 'BNLiHyXDsUa1OhdwsHho47y6rO0HKcNa5BWnofl7'
    }
  }).then(response => {

    // res.json(response.data)

    // clean up the date to provide us the relevant information
    let arrOfPlaces = response.data.data.places
    let arrOfInstances = []

    arrOfPlaces.forEach(place => {
      let instancePlace = { id: place.id, name: place.name, location: place.location, description: place.perex, image: place.thumbnail_url }
      arrOfInstances.push(instancePlace)
    })

    sess.starredItems.push('poi:23432');
    sess.apiResults = response.data;

    res.render('index', {
      attractions: arrOfInstances,
      currentUserId: sess.id,
      starredItems: sess.starredItems,
      apiResults: sess.apiResults
      // geoJData: geoJData, // not required since we made a call to /api/geojson to retrieve the geojson data instead
    })
  })
})

app.get('/itinerary', (req, res) => {
  // app.send('iti page')
  res.render('itinerary')
})

// geoJSON output
app.get('/api/geojson', (req, res) => {
  sess = req.session;
  res.json(geoJSON.convertToGeoJSON(sess.apiResults));
})

////////////   SERVER LISTENNING  /////////////
app.listen(port, () => {
  console.log(`listening to port ${port}`);
})