'use strict'

const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {registerValidators} = require('../utils/validators');

const {Router} = require('express');
const router = Router();
const Admin = require('../models/admin');

router.get('/', (req, res) => {
    res.render('auth/register', {
        title: 'Регистрация',
        registerError: req.flash('registerError'),
        isRegister: true
    });
});

router.post('/', registerValidators, async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg);
            return res.status(422).redirect('/admin')
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await Admin.create({
            email, password: hashPassword
        });
        res.redirect('/admin');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;