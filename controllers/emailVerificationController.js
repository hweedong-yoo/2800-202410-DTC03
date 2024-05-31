/**
 * Express controller functions for email verification functionality.
 * 
 * This module contains functions to handle email verification requests,
 * including rendering the verification page, sending confirmation emails,
 * and updating user email verification status.
 * 
 */

// Import necessary modules
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// Secret key for JWT token generation
const jwtSecret = process.env.JWT_SECRET;

// Base URL for generating confirmation links
const baseUrl = process.env.BASE_URL;

/**
 * Displays the email verification page.
 * 
 * @returns {Promise<void>} - A promise that resolves when the page is rendered successfully.
 * @throws {Error} - If an error occurs while rendering the page.
 */
const displayPage = async (req, res) => {

    let user = await User.findOne({ email: req.session.email });
    if (user.verified) {
        return res.redirect('/home');
    }
    
    try {
        res.render('emailVerification', { authenticated: req.session.authenticated, name: req.session.name, email: req.session.email });
    } catch (error) {
        console.log('Error rendering email verification page:', error);
        res.status(500).render('home', { authenticated: req.session.authenticated });
    }
};

/**
 * Sends a confirmation email to the user's email address.
 * 
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - If an error occurs while sending the confirmation email.
 */
const sendConfirmationEmail = async (req, res) => {
    const email = req.session.email;
    // console.log(email);
    try {
        const secret = jwtSecret + email;
        const payload = { email: email };
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        const subject = 'Biolink account email confirmation';
        const body = `Please click the following link to confirm your email: ${baseUrl}/setup/email/${token}.`;

        sendEmail(email, subject, body);

        res.redirect('/home');
    } catch (error) {
        console.log('Error sending confirmation email:', error);
        res.status(500).render('home', { authenticated: req.session.authenticated });
    }
};

/**
 * Updates the user's account to show that their email has been verified.
 * 
 * @returns {void} - Redirects the user to the home page.
 * @throws {Error} - If an error occurs while verifying the email.
 */
const verifyEmail = async (req, res) => {
    const token = req.params.token;
    const email = req.session.email;

    try {
        const secret = jwtSecret + email;
        const decoded = jwt.verify(token, secret); // will throw an error if the token is invalid

        const user = await User.findOneAndUpdate({ email: email }, { verified: true });

        if (!user) {
            return res.status(404).send('User not found');
        }

    } catch (error) {
        console.log('Error verifying email:', error);
    }
    res.redirect('/home');
};

module.exports = {
    displayPage,
    sendConfirmationEmail,
    verifyEmail,
};
