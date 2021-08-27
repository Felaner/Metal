'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

const sliderImages = fs.readdirSync('images/slider/');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        isHome: true,
        sliderImages
    });
    console.log(req.session)
});

module.exports = router;