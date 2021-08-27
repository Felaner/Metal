const {body} = require('express-validator');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Invalid email')
        .custom(async (value, {req}) => {
            const admin = await Admin.findOne({ email: value });
            if (admin) {
                return Promise.reject('Email already exists');
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({min: 6, max: 56}).withMessage('min lenght password: 6')
        .isAlphanumeric()
        .trim()
]

exports.loginValidators = [
    body('email')
        .custom(async (value, {req}) => {
            const candidate = await Admin.findOne({ email: value });
            if (!candidate) {
                return Promise.reject('Invalid email or password');
            }
        }),
    body('password')
        .custom(async (value, {req}) => {
            const {email} = req.body;
            const candidate = await Admin.findOne({ email })
            const areSame = await bcrypt.compare(value, candidate.password);
            if (!areSame) {
                throw new Error('Invalid email or password');
            }
        })
]