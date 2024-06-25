require('dotenv').config();
const UserModel = require('../model/user');
const errorMessages = require('../constant/ErrorMessages');
const {body, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');

exports.signin = [
    body("username", "username must have at least 5 characters")
        .trim()
        .isLength({min: 5})
        .escape(),

    body("password", "password must have at least 8 characters")
        .trim()
        .isLength({min: 8})
        .escape(),

    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({status: 400, message: errorMessages.VALIDATION_ERROR_MESSAGE, errors});
                return;
            }

            const user = await UserModel.findOne({username: req.body.username, password: req.body.password}).exec();
            if (!user) {
                res.status(403).json({status: 403, message: errorMessages.UNAUTHENTICATED_ERROR});
                return;
            }

            jwt.sign({user: user}, process.env.SECRET_KEY, (err, token) => {
                res.json({
                    status: 200,
                    token: token
                })
            });

        } catch (e) {
            res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
        }
    }
]