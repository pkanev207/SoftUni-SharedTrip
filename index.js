const express = require('express');
const { create } = require('express-handlebars');
const session = require('express-session');

const userSession = require('./middleware/userSession');

const databaseConfig = require('./config/database');

const authController = require('./controllers/auth');
const homeController = require('./controllers/home');
const tripController = require('./controllers/trip');


start();

async function start() {
    const app = express();

    app.engine('.hbs', create({ extname: '.hbs' }).engine);
    app.set('view engine', '.hbs');
    app.use('/static', express.static('static'));
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(userSession());
    await databaseConfig(app);

    app.use(authController);
    app.use(homeController);
    app.use(tripController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found' });
    });

    app.listen(3000, () => console.log('Server is running on port 3000'));
}
