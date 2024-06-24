const express = require("express");
const router = express.Router();
const deckController = require('../conroller/deckController');

router.get('/decks', deckController.get_decks);

router.post('/create', deckController.create_deck);

router.post('/update/:id', deckController.update_deck);

router.post('/delete/:id', deckController.delete_deck);

router.get('/:id', deckController.get_deck_detail);

module.exports = router;