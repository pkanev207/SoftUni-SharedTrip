module.exports = () => (req, res, next) => {
    if (req.session.user) {
        // console.log('User session >>> ', req.session);
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    } else {
        console.log('No user!');
    }

    next();
};
