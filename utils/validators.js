const {body} = require('express-validator');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Не валидный Email')
        .custom(async (value, {req}) => {
            const admin = await Admin.findByPk(1);
            if (admin) {
                return Promise.reject('Администратор уже существует');
            }
        }),
    body('password')
        .isLength({min: 6, max: 56}).withMessage('Минимальная длина пароля: 6')
        .isAlphanumeric()
        .trim()
]

exports.loginValidators = [
    body('email')
        .custom(async (value, {req}) => {
            const candidate = await Admin.findOne({ where: { email: value } });
            if (!candidate) {
                return Promise.reject('Неверный email или пароль');
            }
        }),
    body('password')
        .custom(async (value, {req}) => {
            const { email } = req.body;
            const candidate = await Admin.findOne({ where: { email: email } })
            const areSame = await bcrypt.compare(value, candidate.password);
            if (!areSame) {
                throw new Error('Неверный email или пароль');
            }
        })
]

exports.productValidators = [
    body('title').isLength({min: 1}).withMessage('Введите наименование товара').trim(),
    body('price').isNumeric().withMessage('Введите стоимость товара').trim(),
    body('short_description').isLength({min: 1}).withMessage('Введите краткое описание').trim(),
    body('description').isLength({min: 1}).withMessage('Введите описание').trim(),
    body('checkedImage').notEmpty().withMessage('Выберите хотя бы одно изображение для карточки')
]