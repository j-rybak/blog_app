var UserModel = require('../models/UserModel.js');
var mail = require('../utils/mails');
var passport = require('../utils/passportSettings');
/**
 * AuthController.js
 *
 * @description :: Server-side logic for auth route.
 */
module.exports = {

    /**
     * AuthController.register()
     */
    loginPage: function(req, res, next) {
        res.render('auth/login', { title: 'Zaloguj'});
    },

    login: passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        successFlash: true,
        failureFlash: true
    }),

    registerPage: function(req, res, next) {
        res.render('auth/register', { title: 'Zarejestruj się'});
    },

    register: function (req, res, next) {
        var newUser = new UserModel({
            username: req.body.username,
            email: req.body.email
        });
        var password = req.body.password;
        var passwordConfirm = req.body.passwordConfirm;
        if (password === passwordConfirm) {
            newUser.setPassword(req.body.password);

            newUser.save(function (err, User) {
                if (err) {
                    if (err.name == 'ValidationError') {
                        Object.keys(err.errors).forEach(function (key) {
                            req.flash('danger', err.errors[key].message);
                        });
                        res.redirect('/auth/register');
                    } else {
                        return next(err);
                    }
                } else {
                    var activationLink = 'http://'+req.headers.host + '/auth/activate/' + User.id;
                    res.render('emails/registration', {activationLink: activationLink}, function (err, body) {
                        var mailOptions =
                            {
                                from: '"Blog APP" <blogapp@t.pl>',
                                to: User.email,
                                subject: 'Blog APP Aktywacja konta',
                                html: body
                            };
                        mail.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                req.flash('danger', 'Błąd podczas wysyłania wiadomości email ' + error.message);
                                UserModel.findByIdAndRemove(User.id, function (err, User) {
                                    if (err) {
                                        return next(err);
                                    }
                                });
                                res.redirect('/auth/register');
                            }
                            res.render('auth/register', { title: 'Zarejestruj się', email:User.email});
                        });
                    });
                }
            });
        } else {
            req.flash('danger', 'Hasła nie są zgodne');
            res.redirect('/auth/register');
        }

    },

    /**
     * AuthController.activate()
     */
    activate: function (req, res, next) {
        var id = req.params.id;
        var success = false;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                req.flash('danger', 'Błąd podczas aktywacji');
                res.redirect('/auth/login');
            }
            else if (!User) {
                req.flash('warning', 'Użytkownik nie istnieje');
                res.redirect('/auth/login');
            }

            else if (User.active) {
                req.flash('warning', 'Konto ' + User.username + ' jest aktywne');
                res.redirect('/auth/login');
            }
            else {
                User.active = true;
                User.save(function (err, User) {
                    if (err) {
                        if (err.name == 'ValidationError') {
                            Object.keys(err.errors).forEach(function (key) {
                                req.flash('danger', err.errors[key].message);
                                res.redirect('/')
                            });
                        } else {
                            return next(err);
                        }
                    }
                    else {
                        req.flash('success', 'Konto ' + User.username + ' zostało aktywowane - teraz możesz się zalogować');
                        res.redirect('/')
                    }

                })
            }
        });
    },

    logout: function (req, res) {
        req.logout();
        req.flash('info', 'Wylogowano poprawnie');
        res.redirect('/');
    }
};
