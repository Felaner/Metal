'use strict'

const {Router} = require('express');
const router = Router();

const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const product = await Product.findAll();
        res.render('production', {
            title: 'Наши продукция',
            isProduction: true,
            product
        });
    } catch (e) {
        console.dir(e)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.render('product-page', {
            layout: 'empty',
            title: `${product.title}`,
            product
        });
    } catch(e) {
        console.dir(e)
    }
});

module.exports = router;