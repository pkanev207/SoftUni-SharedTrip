const router = require('express').Router();
const { isUser } = require('../middleware/guards');
const { createTrip } = require('../services/trip');
const { mapErrors } = require('../util/mappers');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Trip Offer', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
    // console.log(req.body);
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        owner: req.session.user._id
    };

    try {
        await createTrip(trip);
        res.redirect('/trips');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        console.log(errors);
        res.render('create', {
            title: 'CREATE THE TRIP AGAIN!!',
            data: trip,
            errors
        });
    }
});

module.exports = router;
