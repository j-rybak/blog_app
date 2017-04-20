var nodemailer = require('nodemailer');

var mailConfig = {
    host: 't.pl',  port: 465,
    secure: true,
    auth: {
        user: 'blogapp@t.pl', pass: '-BtXm=7yD2797@qJ'
    },
    tls: {
        rejectUnauthorized: false
    }
};

var transporter =  nodemailer.createTransport(mailConfig);

module.exports = transporter;