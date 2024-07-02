const express = require("express");
const router = express.Router();
const deckController = require('../controller/deckController');
const verifyToken = require('../utility/VerifyToken');

// router.get('/decks', verifyToken, deckController.get_decks);
//
// router.post('/create', verifyToken, deckController.create_deck);
//
// router.post('/update/:id', verifyToken, deckController.update_deck);
//
// router.post('/delete/:id', verifyToken, deckController.delete_deck);

router.get('/:id', verifyToken, deckController.get_deck_detail);

module.exports = router;