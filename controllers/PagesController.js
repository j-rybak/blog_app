var mail = require('../utils/mails');
var PostModel = require('../models/PostModel');

module.exports = {
    //Index
    index: function (req, res, next) {
        PostModel.find({}, null, {sort: '-createdAt', limit: 5})
            .populate('owner', ['username', '_id']).exec(function (err, Posts) {
            if (err) return next(err);
            res.render('pages/index', { title: 'Blog', posts:Posts});
        });
    },

    //Contact
    contactPage: function (req, res, next) {
        res.render('pages/contact', { title: 'Kontakt' });
    },
    sendContactMessage: function (req, res, next) {
        var context = req.body;

        res.render('emails/contact', context, function (err, body) {
            var mailOptions =
                {
                    from: '"'+req.body.name+'" <'+req.body.email+'>',
                    to: 'blogapp@t.pl',
                    subject: 'Blog APP Wiadomość kontaktowa ' + req.body.subject,
                    html: body
                };
            mail.sendMail(mailOptions, function (error, info) {
                if (error) {
                    req.flash('danger', 'Błąd podczas wysyłania wiadomości email ' + error.message);
                }
                req.flash('info', 'Wiadomość kontaktowa została wysłana');
                res.redirect('/contact');
            });
        });
    }
};
