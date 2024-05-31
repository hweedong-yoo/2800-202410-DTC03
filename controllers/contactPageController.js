
const sendEmail = require('../utils/sendEmail');
const companyEmail = process.env.EMAIL

/**
 * Express controller function for displaying the contact page.
 * 
 * This module contains a function to handle the request to render the contact page.
 * 
 */

// Display the contact page
const displayPage = async (req, res) => {
    try {
        res.render('contactPage', {authenticated : req.session.authenticated});
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * Handles the POST request for sending an email.
 *
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
const sendEmailPost = async (req, res) => {
    const {email, subject, message} = req.body;

    try {
        let newMessage = `From: ${email}\n${message}`; // add email to message
        sendEmail(companyEmail, subject, newMessage);
        res.render('contactPage', {authenticated : req.session.authenticated});
    } catch (error) {
        console.log(error);
        res.render('contactPage', {authenticated : req.session.authenticated});
    }
};

module.exports = {
    displayPage,
    sendEmailPost
};