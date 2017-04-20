var express = require('express');
var router = express.Router();
var PostsController = require('../controllers/PostsController');
var permissions = require('../utils/permissions');

router.get('/', PostsController.list);

router.get('/add', permissions.loggedIn, PostsController.showForm);

router.post('/add', permissions.loggedIn, PostsController.create);

router.get('/:id', permissions.loggedIn, PostsController.show);

router.post('/:id/comment', permissions.loggedIn, PostsController.comment);

router.get('/:id/edit', permissions.loggedIn, PostsController.showForm);

router.post('/:id/edit', permissions.loggedIn, PostsController.update);

router.get('/:id/remove', permissions.isAdmin, PostsController.remove);

module.exports = router;
