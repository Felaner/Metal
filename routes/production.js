'use strict'

const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('production', {
        title: 'Наши продукция',
        isProduction: true
    });
});

module.exports = router;