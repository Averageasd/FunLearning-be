const DeckModel = require("../model/deck");
const constant = require("../constant/Constants");
const errorMessages = require('../constant/ErrorMessages');
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

async function get_user_deck_count(userId) {
    try {
        const allDeckCount = await DeckModel.countDocuments({user: userId}).exec();
        if (!allDeckCount) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }
        return allDeckCount;
    } catch (e) {
        throw e;
    }
}

function stillHasMoreDecks(deckCount, skippedItems) {
    return !(skippedItems >= deckCount || deckCount <= constant.DECK_PER_PAGE);
}

exports.get_decks = async (userId, page) => {
    try {
        const allDeckCount = await get_user_deck_count(userId);
        const skipItemCount = page * constant.DECK_PER_PAGE;
        const hasMoreItems = stillHasMoreDecks(allDeckCount, skipItemCount);
        const curDecks = await DeckModel.find({user: userId}).skip(skipItemCount).limit(constant.DECK_PER_PAGE).lean();
        return {hasMoreItems: hasMoreItems, curDecks: curDecks};
    } catch (e) {
        throw e;
    }
}