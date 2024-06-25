const UserModel = require('../model/user');
const errorMessages = require('../constant/ErrorMessages');
const {body, validationResult} = require("express-validator");
const {credentials_validation} = require("../validation/validations");

exports.signUp = [
    credentials_validation,
    async (req, res, next) => {
        try {
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
            res.status(200).json({status: 200, message: 'sign up sucessfully'});
        } catch (e) {
            res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
        }
    }
]