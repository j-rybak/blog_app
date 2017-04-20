var express = require('express');
var router = express.Router();
var PagesController = require('../controllers/PagesController');

router.get('/', PagesController.index);

router.get('/contact', PagesController.contactPage);

router.post('/contact', PagesController.sendContactMessage);

module.exports = router;
