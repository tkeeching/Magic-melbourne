const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('welcome_page')
})

router.get('/itinerary', (req, res, next) => {
    res.render('itinerary')
})

module.exports = router;