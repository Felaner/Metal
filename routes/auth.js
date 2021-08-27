'use strict'

const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {registerValidators, loginValidators} = require('../utils/validators');

const {Router} = require('express');
const router = Router();
const Admin = require('../models/admin');

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Вход',
        loginError: req.flash('loginError'),
    });
});

router.get('/register', (req, res) => {
    res.render('auth/register', {
        title: 'Регистрация',
        registerError: req.flash('registerError')
    });
});

router.post('/login', loginValidators, async (req, res) => {
    try {
        const {email} = req.body;
        const candidate = await Admin.findOne({ email })
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('loginError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login')
        }
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
            if (err) {
                throw err
            }
            res.redirect('/');
        });
    } catch(e) {
        console.log(e);
    }
})

router.post('/register', registerValidators, async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/register')
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await Admin.create({
            email, password: hashPassword
        });
        res.redirect('/auth/login');
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;