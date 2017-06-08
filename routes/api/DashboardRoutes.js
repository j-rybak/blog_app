var express = require('express');
var router = express.Router();
var DashboardController = require('../../controllers/api/DashboardController.js');

/*
 * GET
 */
router.get('/counts', DashboardController.counts);


module.exports = router;
