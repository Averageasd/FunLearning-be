const express = require("express");
const router = express.Router();
const signupController = require('../conroller/signupController');

router.post('/signup', signupController.signUp);

module.exports = router;