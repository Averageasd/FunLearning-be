const {body, validationResult} = require("express-validator");
const errorMessages = require("../constant/ErrorMessages");

exports.deck_validation = [
    body("name", "deck name must contain at least 5 characters")
        .trim()
        .isLength({min: 5})
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({status: 400, message: errorMessages.VALIDATION_ERROR_MESSAGE, errors});
            return;
        }
        return next();
    }
]

exports.credentials_validation = [
    body("username", "username must have at least 5 characters")
        .trim()
        .isLength({min: 5})
        .escape(),

    body("password", "password must have at least 8 characters")
        .trim()
        .isLength({min: 8})
        .escape(),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({status: 400, message: errorMessages.VALIDATION_ERROR_MESSAGE, errors});
            return;
        }
        return next();
    }
]