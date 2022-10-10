const router = require('express').Router();
const preload = require('../middleware/preload');
const { getAllTrips } = require('../services/trip');


router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

router.get('/trips', async (req, res) => {
    const trips = await getAllTrips();
    res.render('catalog', { title: 'Shared Trip', trips });
});

router.get('/trips/:id', preload(true), (req, res) => {
    // console.log(res.locals.trip);
    if (req.session.user) {
        res.locals.trip.hasUser = true;
        // res.locals.trip.isOwner = req.session.user._id == res.locals.trip.owner._id;
        if (req.session.user._id == res.locals.trip.owner._id) {
            res.locals.trip.isOwner = true;
        }
    }

    res.render('details', { title: 'Trip Details' });
});

module.exports = router;
