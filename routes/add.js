const {Router} = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Добавить товар',
        isAdd: true
    });
});

router.post('/', auth, async (req, res) => {
    res.status(422).render('add',{
        title: 'Добавить товар',
        isAdd: true,
        data: {
            title: req.body.title,
            descr: req.body.descr,
            price: req.body.price,
            img: req.body.img
        }
    })
    try {
        await Product.create({
            title: req.body.title,
            descr: req.body.descr,
            price: req.body.price,
            img: req.body.img
        });
        res.redirect('/courses');
    } catch(e) {
        console.dir(e);
    }
});

module.exports = router;