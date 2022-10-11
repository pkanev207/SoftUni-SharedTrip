const Trip = require('../models/Trip');
const User = require('../models/User'); // for two way binding

async function getAllTrips() {
    return Trip.find({}).lean();
}

async function getTripsByUser(userId) {
    return Trip.find({ owner: userId }).lean();
}

async function getTripById(id) {
    return Trip.findById(id).lean();
}

async function getTripAndUsers(id) {
    return Trip.findById(id).populate('owner').populate('buddies').lean();
}

async function createTrip(trip) {
    const result = new Trip(trip);
    await result.save();
    // after creation in order to have id
    const user = await User.findById(result.owner);
    user.trips.push(result._id);
    await user.save();

    return result;
}

async function updateTrip(id, trip) {
    const existing = await Trip.findById(id);

    existing.start = trip.start;
    existing.end = trip.end;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.carImg = trip.carImg;
    existing.carBrand = trip.carBrand;
    existing.seats = trip.seats;
    existing.price = trip.price;
    existing.description = trip.description;

    await existing.save();
}

async function deleteById(id) {
    await Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);

    if (trip.buddies.includes(userId)) {
        throw new Error('User already is tripping!');
    }

    trip.buddies.push(userId);
    await trip.save();
}

module.exports = {
    getAllTrips,
    getTripsByUser,
    getTripById,
    getTripAndUsers,
    createTrip,
    updateTrip,
    deleteById,
    joinTrip
};
