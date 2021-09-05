'use strict'

const {Router} = require('express');
const router = Router();
const News = require('../models/news');

router.get('/', async (req, res) => {
    const news = await News.findAll()
    res.render('news', {
        title: 'Новости',
        isNews: true,
        news
    });
});

module.exports = router;