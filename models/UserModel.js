var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha1 = require('sha1');
var uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

var UserSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    });

UserSchema.methods.validPassword = function (pass, callback) {
    return sha1(pass) == this.password;
};

UserSchema.methods.setPassword = function (pass, callback) {
    this.password = sha1(pass);
};

UserSchema.plugin(uniqueValidator, { message: '{PATH} {VALUE} jest już zarejestrowany w naszym systemie' });
module.exports = mongoose.model('User', UserSchema);
