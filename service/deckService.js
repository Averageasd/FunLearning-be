const DeckModel = require("../model/deck");
const UserModel = require('../model/user');
const constant = require("../constant/Constants");
const jwt = require('jsonwebtoken');
const errorMessages = require('../constant/ErrorMessages');
const validations = require('../validation/validations');
const mongoose = require('mongoose');

exports.get_deck_detail = async (deckId) => {
    const existingDeck = await DeckModel.findById(deckId).lean();
    if (!existingDeck) {
        throw new Error(403,)
    }
}