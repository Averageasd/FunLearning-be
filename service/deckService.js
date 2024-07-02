const DeckModel = require("../model/deck");
const UserModel = require('../model/user');
const constant = require("../constant/Constants");
const jwt = require('jsonwebtoken');
const errorMessages = require('../constant/ErrorMessages');
const validations = require('../validation/validations');
const mongoose = require('mongoose');
const CustomError = require('../CustomErrors/CustomError');
const validateObjectId = require('../shared/IdValidator');

exports.get_deck_detail = async (deckId) => {
    try {
        if (!validateObjectId.validateObjectId(deckId)) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }
        const existingDeck = await DeckModel.findById(deckId).lean();
        if (!existingDeck) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }
        return existingDeck;
    } catch (e) {
        throw e;
    }
}