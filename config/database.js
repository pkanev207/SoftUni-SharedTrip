const mongoose = require('mongoose');
// We should load all models here to create db
require('../models/User');

const dbName = 'sharedTrip';
const connString = `mongodb://127.0.0.1:27017/${dbName}`;
// const connString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database');
        console.log(err);
        process.exit(1);
    }
};
