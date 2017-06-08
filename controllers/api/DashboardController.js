var PostModel = require('../../models/PostModel.js');
var CommentModel = require('../../models/CommentModel.js');
var UserModel = require('../../models/UserModel.js');

/**
 * CommentController.js
 *
 * @description :: Server-side logic for Admin dashboard.
 */
module.exports = {

    /**
     * CommentController.list()
     */
    counts: function (req, res) {
        var modelsCount= {
            posts:0,
            comments:0,
            users:0
        };
        PostModel.count({},function (err, postsCount) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });

            }
            modelsCount.posts = postsCount || 0;
        }).then(function(){
            CommentModel.count({},function (err, commentsCount) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting Comment.',
                        error: err
                    });
                }
                modelsCount.comments = commentsCount || 0;
            }).then(function(){
                UserModel.count({},function (err, usersCount) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting Comment.',
                            error: err
                        });
                    }
                    modelsCount.users = usersCount || 0;
                    return res.json(modelsCount);
                });

            });
        });


    }
};
