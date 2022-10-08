// TODO replace with actual service
const collectionService = {};

function preload() {
    return async function (req, res, next) {
        // TODO change property name to match collection
        // TODO send to 404 if id is invalid
        const id = req.params.id;
        const data = await collectionService.getById(id);
        // console.log(data);
        res.locals.data = data;
        next();
    };
}

module.exports = preload;
