const nodemailer = require("nodemailer");
require('dotenv').config()

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
            port: 465,
            service:'yahoo',
            secure: false,
            auth: {
               user: process.env.EMAIL,
               pass: process.env.EMAIL_PASSWORD
            },
            debug: false,
            logger: true
    });

    return transporter;
};

module.exports = { createMailTransporter };