const errorMessages = require('../constant/ErrorMessages');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // get token from array
        // set the token
        req.token = bearer[1];
        next();
    } else {
        res.status(403).json({status: 403, message: errorMessages.UNAUTHENTICATED_ERROR});
    }
}

module.exports = verifyToken;