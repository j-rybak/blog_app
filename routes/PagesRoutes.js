var express = require('express');
var router = express.Router();
var PagesController = require('../controllers/PagesController');
var permissions = require('../utils/permissions');

router.get('/', PagesController.index);

router.get('/contact', PagesController.contactPage);

router.post('/contact', PagesController.sendContactMessage);

router.get('/admin', permissions.isAdmin, PagesController.admin);
module.exports = router;
