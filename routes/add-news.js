const {Router} = require('express');
const News = require('../models/news');
const {validationResult} = require('express-validator');
const {newsValidators} = require('../utils/validators');
const auth = require('../middleware/auth');
const router = Router();
const moment = require('moment');

router.get('/', auth, (req, res) => {
    res.render('add-news', {
        title: 'Добавить новость',
        isAddNews: true
    });
});

router.post('/', auth, newsValidators, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('add-news',{
            title: 'Добавить новость',
            isAddNews: true,
            error: errors.array()[0].msg,
            data: {
                newsTitle: req.body.newsTitle,
                newsDescription: req.body.newsDescription
            }
        })
    }
    try {
        await News.create({
            title: req.body.newsTitle,
            description: req.body.newsDescription,
            dir: 'images/news/' + req.files['newsImg'][0].filename,
            createdAt: moment().format('L')
        });
        res.redirect('/add-news');
    } catch(e) {
        console.dir(e);
    }
});

module.exports = router;