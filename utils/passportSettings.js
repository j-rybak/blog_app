var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
var UserModel = require('./../models/UserModel');

passport.use('login', new LocalStrategy(
    function (username, password, done) {
        UserModel.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Błędna nazwa użytkownika'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Błędne hasło'});
            }
            if (!user.active) {
                return done(null, false, {message: 'Użytkownik nieaktywny'});
            }
            return done(null, user, {message: 'Zalogowano poprawnie'});
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;