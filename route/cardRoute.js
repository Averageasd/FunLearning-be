const express = require("express");
const router = express.Router();
const cardController = require('../conroller/cardController');

router.get('/cards', cardController.get_cards);

router.post('/create', cardController.create_card);

router.post('/update/:id', cardController.update_card);

router.post('/delete/:id', cardController.delete_card);

router.get('/:id', cardController.get_card_detail);

module.exports = router;