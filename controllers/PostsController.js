var PostModel = require('../models/PostModel.js');
var CommentModel = require('../models/CommentModel');
var permissions = require('../utils/permissions');

module.exports = {
    list: function (req, res, next) {
        var limit = 5;
        var page = req.query.page || 1;

        PostModel.paginate({}, {
            sort: '-createdAt',
            populate: ['owner', ['username', '_id']],
            limit: limit,
            page: page
        }, function (err, Posts) {
            if (err) return next(err);
            if (page > Posts.pages) {
                req.flash('warning', 'Strona o numerze ' + page + ' nie istnieje');
                res.redirect('/posts')
            }
            res.render('posts/list', {title: 'Blog', posts: Posts.docs, currentPage: page, lastPage: Posts.pages});
        });

    },

    show: function (req, res, next) {
        var id = req.params.id;
        PostModel.findOne({_id: id}).populate('owner', ['username', '_id']).exec(function (err, Post) {
            if (err) return next(err);
            if (!Post) {
                req.flash('warning', 'Post nie istnieje');
                res.redirect('/posts')
            }
            else {
                CommentModel.find({post: Post._id}).populate('owner', ['username', '_id']).exec(function (err, Comments) {
                    if (err) return next(err);
                    res.render('posts/detail', {title: Post.title, post: Post, comments: Comments});
                });
            }

        });
    },

    showForm: function (req, res, next) {
        var id = req.params.id;
        if (id) {
            PostModel.findOne({_id: id}).populate('owner', ['username', '_id']).exec(function (err, Post) {
                if (err) return next(err);
                if (!Post) {
                    req.flash('warning', 'Post nie istnieje');
                    res.redirect('/posts')
                }
                else {
                    permissions.hasObjectPermissions(req, res, Post);
                    res.render('posts/edit', {
                        title: 'Edytuj post',
                        post: Post,
                        action: '/posts/' + Post._id + '/edit'
                    });
                }

            });
        } else {
            res.render('posts/edit', {title: 'Dodaj post', post: {}, action: '/posts/add'});
        }

    },

    create: function (req, res, next) {
        var Post = new PostModel({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            owner: req.user._id
        });

        Post.save(function (err, Post) {
            if (err) {
                if (err.name == 'ValidationError') {
                    Object.keys(err.errors).forEach(function (key) {
                        req.flash('danger', err.errors[key].message);
                        res.render('posts/edit', {title: 'Dodaj post', post: Post, action: '/posts/add'});
                    });
                } else {
                    return next(err);
                }
            } else {
                req.flash('info', 'Post utworzono');
                res.redirect('/posts/' + Post._id)
            }
        });
    },

    /**
     * PostController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({_id: id}).populate('owner', ['username', '_id']).exec(function (err, Post) {
            if (err) return next(err);
            if (!Post) {
                req.flash('warning', 'Post nie istnieje');
                res.redirect('/posts')
            }
            permissions.hasObjectPermissions(req, res, Post);
            Post.title = req.body.title ? req.body.title : Post.title;
            Post.content = req.body.content ? req.body.content : Post.content;
            Post.image = req.body.image ? req.body.image : Post.image;

            Post.save(function (err, Post) {
                if (err) {
                    if (err.name == 'ValidationError') {
                        Object.keys(err.errors).forEach(function (key) {
                            req.flash('danger', err.errors[key].message);
                            res.render('posts/edit', {
                                title: 'Edytuj post',
                                post: Post,
                                action: '/posts/' + Post._id + '/edit'
                            });
                        });
                    } else {
                        return next(err);
                    }
                } else {
                    req.flash('info', 'Post zedytowano');
                    res.redirect('/posts/' + Post._id)
                }
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        PostModel.findByIdAndRemove(id, function (err, Post) {
            if (err) return next(err);
            if (!Post) {
                req.flash('warning', 'Post nie istnieje');
                res.redirect('/posts')
            }
            req.flash('info', 'Post usunięto');
            res.redirect('/posts')
        });
    },

    comment: function (req, res, next) {
        var id = req.params.id;
        var Comment = new CommentModel({
            content: req.body.content,
            post: id,
            owner: req.user._id
        });
        PostModel.findOne({_id: id}).populate('owner', ['username', '_id']).exec(function (err, Post) {
            if (err) return next(err);
            if (!Post) {
                req.flash('warning', 'Post nie istnieje');
                res.redirect('/posts?page=' + Pages.pages)
            }
            else {
                Comment.save(function (err, Comment) {
                    if (err) {
                        if (err.name == 'ValidationError') {
                            Object.keys(err.errors).forEach(function (key) {
                                req.flash('danger', err.errors[key].message);
                                res.redirect('/posts/' + id)
                            });
                        } else {
                            return next(err);
                        }
                    } else {
                        req.flash('info', 'Komentarz dodano');
                        res.redirect('/posts/' + id)
                    }
                });
            }
        });

    }
};
