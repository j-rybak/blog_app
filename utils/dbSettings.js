var mongoose = require('mongoose');

//var dbURI = 'mongodb://localhost/blog_v2';
var dbURI = 'mongodb://ds047935.mlab.com:47935/blog_app';

var options = {
    server: {reconnectTries: 100, auto_reconnect: true},
    user: 'blog_app',
    pass: 'xyX#-WBTk7Vqy47J'
};

mongoose.connect(dbURI, options);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
    console.log('Trying to reconnect to database');
    setTimeout(function () {
        mongoose.connect(dbURI, options);
    }, 5000);
});

mongoose.connection.db.on('reconnect', function (ref) {
    console.log('reconnect to mongo server.');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


module.exports = mongoose;