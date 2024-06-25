const DeckModel = require("../model/deck");
const constant = require("../constant/Constants");
const errorMessages = require('../constant/ErrorMessages');
const {body, validationResult} = require("express-validator");


exports.get_deck_detail = (async (req, res, next) => {
    //TODO : get detail of deck
});

exports.get_decks = (async (req, res, next) => {
    //TODO: get all decks with pagination
    try {
        const page = req.query.page;
        const allDecks = await DeckModel.find({}).skip(page * constant.DECK_PER_PAGE).limit(constant.DECK_PER_PAGE);
        res.status(200).json({decks: allDecks, status: 200});
    } catch (e) {

    }
});

exports.create_deck = [

    body("name", "deck name must contain at least 5 characters")
        .trim()
        .isLength({min: 5})
        .escape(),

    async (req, res, next) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                res.status(400).json({status: 400, message: errorMessages.VALIDATION_ERROR_MESSAGE, errors});
                return;
            }

            const newDeck = new DeckModel({
                name: req.body.name,
            });

            const existingDeck = await DeckModel.findOne({name: newDeck.name}).exec();
            if (existingDeck) {
                res.status(400).json({status: 400, message: errorMessages.BAD_REQUEST_MESSAGE});
                return;
            }
            await newDeck.save();
            res.status(200).json({status: 200, deck: newDeck});
        } catch (e) {
            res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
        }
    }
];

exports.update_deck = (async (req, res, next) => {
    //TODO: handle updating deck
});

exports.delete_deck = (async (req, res, next) => {
    //TODO: handle deleting deck
});