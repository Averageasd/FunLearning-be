const express = require("express");
const router = express.Router();
const signupController = require('../controller/signupController');
const signinController = require('../controller/signinController');

router.post('/signup', signupController.signUp);
router.post('/signin', signinController.signin);

module.exports = router;