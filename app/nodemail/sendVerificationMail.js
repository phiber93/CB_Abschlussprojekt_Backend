const { createMailTransporter } = require("./createMailTransporter");
const db = require("../models");

const sendVerificationMail = (user) => {
    const transporter = createMailTransporter();

    const mailOptions = {
        from: '"Monster Survivors" <nightcl4w@yahoo.com>',
        to: user.email,
        subject: "Verifiy your email",
        html: `<p>Hi ${user.username}, please verify your email by clicking on this link:
        <a href="http://localhost:4200/verify-email?emailToken=${user.verification_token}"> Verifiy your mail<a>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error); 
        } else {
            console.log("Email sent");
        }
    });
};

module.exports = {sendVerificationMail};