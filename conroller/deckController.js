require('dotenv').config();
const DeckModel = require("../model/deck");
const UserModel = require('../model/user');
const constant = require("../constant/Constants");
const jwt = require('jsonwebtoken');
const errorMessages = require('../constant/ErrorMessages');
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");


exports.get_deck_detail = async (req, res, next) => {
    //TODO : get detail of deck

};

exports.get_decks = async (req, res, next) => {
    //TODO: get all decks with pagination
    jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
        const userId = authData.user._id;
        try {
            if (err) {
                res.status(403).json({status: 403, message: errorMessages.VALIDATION_ERROR_MESSAGE});
                return;
            }

            const page = req.query.page;
            let hasMoreItems = true;
            const allDecksCount = await DeckModel.countDocuments({user:userId}).exec();
            const skipItemCount = page * constant.DECK_PER_PAGE;
            if (skipItemCount >= allDecksCount || allDecksCount <= constant.DECK_PER_PAGE) {
                hasMoreItems = false;
            }
            const decks = await DeckModel.find({user:userId}).skip(skipItemCount).limit(constant.DECK_PER_PAGE).exec();
            res.status(200).json({decks: decks, hasMoreItems: hasMoreItems});
        } catch (e) {
            console.log(e);
            res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
        }
    })
};

exports.create_deck = [

    body("name", "deck name must contain at least 5 characters")
        .trim()
        .isLength({min: 5})
        .escape(),

    async (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
            const userId = authData.user._id;
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    console.log(errors);
                    res.status(400).json({status: 400, message: errorMessages.VALIDATION_ERROR_MESSAGE, errors});
                    return;
                }

                if (err) {
                    res.status(403).json({status: 403, message: errorMessages.VALIDATION_ERROR_MESSAGE});
                    return;
                }

                const newDeck = new DeckModel({
                    name: req.body.name,
                    user: userId,
                });

                const existingDeck = await DeckModel.findOne({name: newDeck.name, user:userId}).exec();
                if (existingDeck) {
                    res.status(400).json({status: 400, message: errorMessages.BAD_REQUEST_MESSAGE});
                    return;
                }
                await newDeck.save();
                const curUser = await UserModel.findById(userId).exec();
                const updatedDecks = [...curUser.decks];
                updatedDecks.push(newDeck._id);
                const updatedUserDecks = await UserModel.findByIdAndUpdate(userId, {
                    decks: updatedDecks
                }, {new: true});

                console.log(updatedUserDecks);
                res.status(200).json({status: 200, deck: newDeck, authData});
            } catch (e) {
                console.log(e);
                res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
            }
        })
    }
];

exports.update_deck = (async (req, res, next) => {
    //TODO: handle updating deck
});

exports.delete_deck = (async (req, res, next) => {
    //TODO: handle deleting deck
});