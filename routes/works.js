'use strict'

const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('works', {
        title: 'Наши проекты',
        isProjects: true
    });
});

module.exports = router;