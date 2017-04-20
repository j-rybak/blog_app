var CommentModel = require('../../models/CommentModel.js');

/**
 * CommentController.js
 *
 * @description :: Server-side logic for managing Comments.
 */
module.exports = {

    /**
     * CommentController.list()
     */
    list: function (req, res) {
        CommentModel.find(function (err, Comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            }
            return res.json(Comments);
        });
    },

    /**
     * CommentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({_id: id}, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }
            return res.json(Comment);
        });
    },

    /**
     * CommentController.create()
     */
    create: function (req, res) {
        var Comment = new CommentModel({
			content : req.body.content,
			post : req.body.post,
			owner : req.body.owner
        });

        Comment.save(function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Comment',
                    error: err
                });
            }
            return res.status(201).json(Comment);
        });
    },

    /**
     * CommentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({_id: id}, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }

			Comment.content = req.body.content ? req.body.content : Comment.content;
			Comment.post = req.body.post ? req.body.post : Comment.post;
			Comment.owner = req.body.owner ? req.body.owner : Comment.owner;
			
            Comment.save(function (err, Comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Comment.',
                        error: err
                    });
                }

                return res.json(Comment);
            });
        });
    },

    /**
     * CommentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CommentModel.findByIdAndRemove(id, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Comment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
