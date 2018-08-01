var express = require('express');
var router = express.Router();
var userController = require("../controller/userController");

/* GET users listing. */
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/fbsign', userController.fbSignIn);

module.exports = router;
