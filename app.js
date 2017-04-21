var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var passport = require('./utils/passportSettings');

var pages = require('./routes/PagesRoutes');
var auth = require('./routes/AuthRoutes');
var posts = require('./routes/PostsRoutes');
var usersApi = require('./routes/api/UserRoutes');
var postsApi = require('./routes/api/PostRoutes');
var commentsApi = require('./routes/api/PostRoutes');

var app = express();

var db = require('./utils/dbSettings');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '8sQ!y9Vxm7hCT2g%Q@JY$EAHrfT#+bu_aJT+=aB8dKEJZ&^JsvTp#t9hB!HWb5dvWwVts',
    cookie: {maxAge: null}

}));
app.use(flash());
//MUST BE BEFORE ROUTER!!!
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.locals.moment.locale('pl');



//Middleware for displaying user info
app.use(function (req, res, next) {
    res.locals.authenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.url = req.url;
    res.locals.host = req.headers.host;
    next();
});

//Middleware for sends mesages to context
app.use(function (req, res, next) {
    var messages = req.session.flash || {};
    if (messages.hasOwnProperty('error')) {
        messages['danger'] = messages['danger'] || [];
        Array.prototype.push.apply(messages['danger'], messages['error']);
        delete messages['error'];
    }
    res.locals.messages = messages;
    req.session.flash = {};
    next();
});

//Middleware for checking db connection
app.use(function (req, res, next) {
    if(!db.connection.readyState){
        console.error('Database error when accessing '+req.url);
        next(new Error('Błąd połączenia z bazą danych'));
    }
    next();
});
//WEBSITE ROUTES
app.use('/', pages);
app.use('/auth', auth);
app.use('/posts', posts);


//API ROUTES
app.use('/api/users', usersApi);
app.use('/api/posts', postsApi);
app.use('/api/comments', commentsApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
