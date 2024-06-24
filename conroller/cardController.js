const CardModel = require('../model/card');
const constant = require('../constant/Constants');
exports.get_card_detail = (async (req, res, next) => {
    //TODO : get detail of card
});

exports.get_cards = (async (req, res, next) => {
    //TODO: get all cards with pagination
    try {
        const page = req.query.page;
        const allCards = await CardModel.find({}).skip(page * constant.CARD_PER_PAGE).limit(constant.CARD_PER_PAGE);
        res.status(200).json({cards: allCards, status: 200});
    } catch (e) {

    }
});

exports.create_card = (async (req, res, next) => {
    //TODO: handle creating new card
});

exports.update_card = (async (req, res, next) => {
    //TODO: handle updating card
});

exports.delete_card = (async (req, res, next) => {
    //TODO: handle deleting card
});