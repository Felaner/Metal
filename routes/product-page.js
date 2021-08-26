'use strict'

const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('product-page', {
        title: 'Товар'
    });
});

module.exports = router;