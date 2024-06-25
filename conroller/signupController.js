const UserModel = require('../model/user');
const errorMessages = require('../constant/ErrorMessages');
const {body, validationResult} = require("express-validator");

exports.signUp = [
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
                console.log(errors);
                res.status(400).json({status: 400, message: errorMessages.VALIDATION_ERROR_MESSAGE, errors});
                return;
            }
            const existingUser = await UserModel.findOne({username: req.body.username}).exec();
            if (existingUser) {
                res.status(403).json({status: 403, message: errorMessages.UNAUTHENTICATED_ERROR});
                return;
            }

            const newUser = new UserModel({
                username: req.body.username,
                password: req.body.password,
            })
            await newUser.save();
            res.status(200).json({status: 200, user: newUser});
        } catch (e) {
            res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
        }
    }
]