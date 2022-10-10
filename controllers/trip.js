const router = require('express').Router();
const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createTrip, updateTrip, deleteById } = require('../services/trip');
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
        seats: Number(req.body.seats),
        price: Number(req.body.price),
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

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Offer' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    // console.log(req.body);
    const id = req.params.id;
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description
    };

    try {
        await updateTrip(id, trip);
        res.redirect('/trips/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        trip._id = id;
        res.render('edit', {
            title: 'EDIT THE TRIP AGAIN!!',
            trip,
            errors
        });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/trips');
});

module.exports = router;
