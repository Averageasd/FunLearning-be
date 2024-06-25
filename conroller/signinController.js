require('dotenv').config();
const UserModel = require('../model/user');
const errorMessages = require('../constant/ErrorMessages');
const {body, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const {credentials_validation} = require("../validation/validations");

exports.signin = [
    credentials_validation,
    async (req, res, next) => {
        try {
            const user = await UserModel.findOne({username: req.body.username, password: req.body.password}).exec();
            if (!user) {
                res.status(403).json({status: 403, message: errorMessages.UNAUTHENTICATED_ERROR});
                return;
            }

            jwt.sign({user: {_id:user._id,username: user.username}}, process.env.SECRET_KEY, (err, token) => {
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