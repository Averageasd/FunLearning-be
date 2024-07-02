const errorMessages = require('../constant/ErrorMessages');
const CustomError = require('../CustomErrors/CustomError');

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
        throw new CustomError(errorMessages.UNAUTHENTICATED_ERROR, 403);
    }
}

module.exports = verifyToken;