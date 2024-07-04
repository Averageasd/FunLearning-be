require('dotenv').config();
const DeckModel = require("../model/deck");
const UserModel = require('../model/user');
const constant = require("../constant/Constants");
const jwt = require('jsonwebtoken');
const errorMessages = require('../constant/ErrorMessages');
const validations = require('../validation/validations');
const mongoose = require('mongoose');
const CustomError = require('../CustomErrors/CustomError');
const deckService = require('../service/deckService');
const {body} = require("express-validator");


exports.get_deck_detail = async function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_KEY, async function (err, authData) {
        try {
            if (err) {
                throw new CustomError(errorMessages.UNAUTHENTICATED_ERROR, 403);
            }
            const existingDeck = await deckService.get_deck_detail(req.params.id);
            return res.status(200).json({status: 200, deck: existingDeck});
        } catch (e) {
            return next(e);
        }
    });
};

exports.get_decks = async (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
        try {
            if (err) {
                throw new CustomError(errorMessages.UNAUTHENTICATED_ERROR, 403);
            }
            const userId = authData.user._id;
            const page = req.query.page;
            const {hasMoreItems, curDecks} = await deckService.get_decks(userId, page);
            res.status(200).json({decks: curDecks, hasMoreItems: hasMoreItems});
        } catch (e) {
            return next(e);
        }
    })
};

exports.create_deck = [

    validations.deck_validation,
    async (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
            try {
                if (err) {
                    throw new CustomError(errorMessages.UNAUTHENTICATED_ERROR, 403);
                }
                const userId = authData.user._id;
                const {name} = req.body;
                const newDeck = await deckService.create_deck(userId, name);
                console.log(newDeck);
                res.status(200).json({status: 200, deck: newDeck});
            } catch (e) {
                return next(e);
            }
        })
    }
];

// exports.update_deck = [
//     validations.deck_validation,
//     async (req, res, next) => {
//         jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
//             try {
//                 if (err) {
//                     res.status(403).json({status: 403, message: errorMessages.VALIDATION_ERROR_MESSAGE});
//                     return;
//                 }
//                 const {name} = req.body;
//                 const curDeck = await DeckModel.findById(req.params.id).exec();
//                 if (!curDeck) {
//                     res.status(400).json({status: 400, message: errorMessages.BAD_REQUEST_MESSAGE});
//                     return;
//                 }
//                 const updatedDeck = await DeckModel.findByIdAndUpdate(req.params.id, {
//                         name: name,
//                     },
//                     {new: true}
//                 );
//                 res.status(200).json({status: 200, deck: updatedDeck});
//             } catch (e) {
//                 console.log(e);
//                 res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
//             }
//         })
//     }
// ]
//
// exports.delete_deck = (async (req, res, next) => {
//     jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
//         try {
//             if (err) {
//                 return res.status(403).json({status: 403, message: errorMessages.VALIDATION_ERROR_MESSAGE});
//             }
//             const curDeck = await DeckModel.findByIdAndDelete(req.params.id).exec();
//             if (!curDeck) {
//                 return res.status(400).json({status: 400, message: errorMessages.BAD_REQUEST_MESSAGE});
//             }
//             const userId = authData.user._id;
//             const deckOwner = await UserModel.findById(userId).exec();
//             const indexOfDeletedDeck = deckOwner.decks.indexOf(new mongoose.Types.ObjectId(req.params.id));
//             deckOwner.decks.splice(indexOfDeletedDeck, 1);
//             await UserModel.findByIdAndUpdate(userId, {
//                 decks: deckOwner.decks
//             });
//
//             res.status(200).json({status: 200, message: 'delete deck successfully'});
//         } catch (e) {
//             console.log(e);
//             res.status(500).json({status: 500, message: errorMessages.SERVER_ERROR_MESSAGE});
//         }
//     })
// });