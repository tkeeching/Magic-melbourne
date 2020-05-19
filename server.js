////////////   Modules  /////////////
const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

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
    res.render('index')
})






////////////   SERVER LISTENNING  /////////////
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})