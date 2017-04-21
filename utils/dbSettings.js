var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/blog_v2';


mongoose.connect(dbURI, {server: {reconnectTries: 100, auto_reconnect: true}});
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
    console.log('Trying to reconnect to database');
    setTimeout(function(){
        mongoose.connect(dbURI, {server: {reconnectTries: Number.MAX_VALUE, auto_reconnect: true}});
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