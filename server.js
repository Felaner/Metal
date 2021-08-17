'use strict'

const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const path = require('path');

const app = express();

const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');
const productionRoute = require('./routes/production');
const worksRoute = require('./routes/works');
const newsRoute = require('./routes/news');
const contactsRoute = require('./routes/contacts');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoute);
app.use('/about', aboutRoute);
app.use('/production', productionRoute);
app.use('/works', worksRoute);
app.use('/news', newsRoute);
app.use('/contacts', contactsRoute);

const PORT = 3000;

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });
    } catch (e) {
        console.dir(e);
    }
}

start();