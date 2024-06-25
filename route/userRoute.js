const express = require("express");
const router = express.Router();
const signupController = require('../conroller/signupController');
const signinController = require('../conroller/signinController');

router.post('/signup', signupController.signUp);
router.post('/signin', signinController.signin);

module.exports = router;