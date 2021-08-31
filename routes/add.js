const {Router} = require('express');
const Product = require('../models/product');
const Image = require('../models/images');
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
            title: '',
            description: '',
            price: '',
            img: ''
        }
    })
    try {
        await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });
        for(let i = 0; i < req.files.length; i++){
            Image.create({
                idProduct: req.body.title,
                dir: 'images/products/' + req.files[i].filename
            });
        }
        res.redirect('/add');
    } catch(e) {
        console.dir(e);
    }
});

module.exports = router;