/**
 * Express controller functions for user authentication.
 * 
 * This module contains functions to handle user login requests,
 * including rendering the login page, validating user input,
 * and authenticating users.
 * 
 */


// Import necessary modules
const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Session expiration time in milliseconds
const expireTime = 60 * 60 * 1000; // 1 hour

/**
 * Displays the login page.
 * 
 * @returns {Promise<void>} - A promise that resolves when the page is rendered successfully.
 * @throws {Error} - If an error occurs while rendering the page.
 */
const displayPage = async (req, res) => {
    try {
        if (req.session.authenticated) {
            console.log('authenticated:', req.session.authenticated);
            return res.redirect('home');
        }
        res.render('loginPage', { authenticated: req.session.authenticated, error: req.query.error });
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * Authenticates the user based on provided email and password.
 * 
 * @returns {void} - Redirects the user based on the authentication result.
 * @throws {Error} - If an error occurs during validation or authentication.
 */
const authenticateUser = async (req, res) => {
    try {
        const { password, email } = req.body;

        const schema = Joi.object({
            password: Joi.string().max(255).required(),
            email: Joi.string().email().max(255).required()
        });

        const validationResult = schema.validate({ password, email });
        
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.redirect('/login?error=invalidPassword');
        } else {
            req.session.authenticated = true;
            req.session.userID = user._id.toString();
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.cookie.maxAge = expireTime;
            res.redirect('/home');
        }
    } catch (error) {
        console.error('Error in authenticateUser:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    displayPage,
    authenticateUser,
};
