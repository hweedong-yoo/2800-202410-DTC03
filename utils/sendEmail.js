const nodemailer = require('nodemailer');
const companyEmail = process.env.EMAIL;
const companyPassword = process.env.EMAIL_PASSWORD;

/**
 * Sends an email using the provided email, subject, and body.
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The body content of the email. 
 */ 

function sendEmail(email, subject, body) {
    console.log('Sending email')
    console.log(companyEmail, companyPassword)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: companyEmail,
            pass: companyPassword,
        }
    });

    const mailOptions = {
        from: companyEmail,
        to: email,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    }); 
}

module.exports = sendEmail;
