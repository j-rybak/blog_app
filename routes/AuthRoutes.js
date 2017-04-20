var express = require('express');
var permissions = require('../utils/permissions');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

router.get('/login', AuthController.loginPage );

router.post('/login', AuthController.login);

router.get('/register', AuthController.registerPage);

router.post('/register', AuthController.register);

router.get('/activate/:id', AuthController.activate);

router.get('/logout', permissions.loggedIn, AuthController.logout);


module.exports = router;