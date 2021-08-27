'use strict'

const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {loginValidators} = require('../utils/validators');

const {Router} = require('express');
const router = Router();
const Admin = require('../models/admin');

router.get('/', (req, res) => {
    res.render('auth/login', {
        title: 'Вход',
        loginError: req.flash('loginError'),
        isLogin: true
    });
});

router.post('/', loginValidators, async (req, res) => {
    try {
        const {email} = req.body;
        const candidate = await Admin.findOne({ where: { email: email } });
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

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/')
        })
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;