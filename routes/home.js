'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        isHome: true
    });
});

module.exports = router;