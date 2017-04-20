var PostModel = require('../../models/PostModel.js');

/**
 * PostController.js
 *
 * @description :: Server-side logic for managing Posts.
 */
module.exports = {

    /**
     * PostController.list()
     */
    list: function (req, res) {
        PostModel.find(function (err, Posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            return res.json(Posts);
        });
    },

    /**
     * PostController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({_id: id}, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }
            return res.json(Post);
        });
    },

    /**
     * PostController.create()
     */
    create: function (req, res) {
        var Post = new PostModel({
			title : req.body.title,
			content : req.body.content,
            image : req.body.image,
            owner: req.body.owner
        });

        Post.save(function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Post',
                    error: err
                });
            }
            return res.status(201).json(Post);
        });
    },

    /**
     * PostController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({_id: id}, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }

            Post.title = req.body.title ? req.body.title : Post.title;
			Post.content = req.body.content ? req.body.content : Post.content;
            Post.image = req.body.image ? req.body.image : Post.image;
            Post.owner = req.body.owner ? req.body.owner : Post.owner;

            Post.save(function (err, Post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Post.',
                        error: err
                    });
                }

                return res.json(Post);
            });
        });
    },

    /**
     * PostController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PostModel.findByIdAndRemove(id, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Post.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
