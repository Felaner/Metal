'use strict'

const express = require('express');
const session = require('express-session');
const sequelize = require('./utils/database');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const path = require('path');

const app = express();

const keys = require('./keys/keys');

const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');
const productionRoute = require('./routes/production');
const worksRoute = require('./routes/works');
const newsRoute = require('./routes/news');
const contactsRoute = require('./routes/contacts');

const addRoute = require('./routes/add');
const addnewsRoute = require('./routes/add-news')

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

const errorHandler = require('./middleware/error');
const varMiddleware = require('./middleware/variables');
const fileMiddleware = require('./middleware/file');

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

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(fileMiddleware.array('img', 4));

app.use(flash());
app.use(varMiddleware)

app.use('/', homeRoute);
app.use('/about', aboutRoute);
app.use('/production', productionRoute);
app.use('/works', worksRoute);
app.use('/news', newsRoute);
app.use('/contacts', contactsRoute);

app.use('/add', addRoute);
app.use('/add-news', addnewsRoute);

app.use('/admin', loginRoute);
app.use('/admin-register', registerRoute);

app.use(errorHandler);

const PORT = 3000;

async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });
    } catch (e) {
        console.dir(e);
    }
}

start();