const {Router} = require('express');
const {validationResult} = require('express-validator');
const Product = require('../models/product');
const Image = require('../models/images');
const auth = require('../middleware/auth');
const { productValidators } = require('../utils/validators');
const router = Router();

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Добавить товар',
        isAdd: true
    });
});

router.post('/', auth, productValidators, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('add', {
            title: 'Добавить товар',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                short_description: req.body.short_description,
                description: req.body.description
            }
        })
    }
    try {
        await Product.create({
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description,
            price: req.body.price,
            preview: 'images/products/' + req.files[req.body.selectedImage].filename
        });
        for(let i = 0; i < req.files.length; i++){
            if (i === req.body.selectedImage) {
                continue;
            }
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