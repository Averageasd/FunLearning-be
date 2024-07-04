const DeckModel = require("../model/deck");
const constant = require("../constant/Constants");
const errorMessages = require('../constant/ErrorMessages');
const CustomError = require('../CustomErrors/CustomError');
const validateObjectId = require('../shared/IdValidator');
const UserModel = require("../model/user");

exports.get_deck_detail = async (deckId) => {
    try {
        if (!validateObjectId.validateObjectId(deckId)) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }
        const existingDeck = await get_deck_with_id(deckId);
        if (!existingDeck) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }
        return existingDeck;
    } catch (e) {
        throw e;
    }
}

async function get_deck_with_id(deckId) {
    try {
        return await DeckModel.findById(deckId).lean();
    } catch (e) {
        throw e;
    }
}

async function get_user_deck_count(userId) {
    try {
        return await DeckModel.countDocuments({user: userId}).exec();
    } catch (e) {
        throw e;
    }
}

async function get_deck_with_name(userId, deckName) {
    try {
        return await DeckModel.findOne({name: deckName, user: userId}).lean();
    } catch (e) {
        throw e;
    }
}

exports.create_deck = async (userId, deckName) => {
    try {
        if (!validateObjectId.validateObjectId(userId)) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }
        const deckWithName = await get_deck_with_name(userId, deckName);
        if (deckWithName) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }

        const newDeck = await create_new_deck(userId, deckName);
        await update_user_decks(userId, newDeck._id);
        return newDeck;

    } catch (e) {
        throw e;
    }
}

async function update_user_decks(userId, deckId) {
    const curUser = await UserModel.findById(userId).exec();
    const updatedDecks = [...curUser.decks];
    updatedDecks.push(deckId);
    await UserModel.findByIdAndUpdate(userId, {
        decks: updatedDecks
    });
}

async function create_new_deck(userId, deckName) {
    const newDeck = new DeckModel({
        name: deckName,
        user: userId,
    });
    await newDeck.save();
    return newDeck;
}

function still_has_more_decks(deckCount, skippedItems) {
    return !(skippedItems >= deckCount || deckCount <= constant.DECK_PER_PAGE);
}

exports.get_decks = async (userId, page) => {
    try {
        if (!validateObjectId.validateObjectId(userId)) {
            throw new CustomError(errorMessages.BAD_REQUEST_MESSAGE, 404);
        }
        const allDeckCount = await get_user_deck_count(userId);
        const skipItemCount = page * constant.DECK_PER_PAGE;
        const hasMoreItems = still_has_more_decks(allDeckCount, skipItemCount);
        const curDecks = await DeckModel.find({user: userId}).skip(skipItemCount).limit(constant.DECK_PER_PAGE).lean();
        return {hasMoreItems: hasMoreItems, curDecks: curDecks};
    } catch (e) {
        throw e;
    }
}