'use strict'

const {Router} = require('express');
const router = Router();
const News = require('../models/news');

router.get('/', async (req, res) => {

    await News.findAll({
        order: [['updatedAt', 'DESC']]
    }).then(function (news) {
        res.render('news', {
            title: 'Новости',
            isNews: true,
            news
        });
    })
});

module.exports = router;