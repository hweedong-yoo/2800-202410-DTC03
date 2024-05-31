/**
 * Express controller functions for user sign-up functionality.
 * 
 * This module contains functions to handle user sign-up requests,
 * including rendering the sign-up page, validating user input,
 * adding users to the database, and sending confirmation emails.
 * 
 */

// Import necessary modules
const userModel = require('../models/userModels');
const sendEmail = require('../utils/sendEmail');
const { signUpSchema } = require('../validation/authValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Base URL for generating confirmation links
const baseUrl = process.env.BASE_URL;

// Secret key for JWT token generation
const jwtSecret = process.env.JWT_SECRET;

// Token expiration time in milliseconds
const expireTime = 60 * 60 * 1000; // 1 hour

/**
 * Displays the sign up page.
 * 
 * @returns {Promise<void>} - A promise that resolves when the page is rendered successfully.
 * @throws {Error} - If an error occurs while rendering the page.
 */
const displayPage = async (req, res) => {
    try {
        res.render('signupPage', { authenticated: req.session.authenticated });
    } catch (error) {
        console.log('Error rendering sign-up page:', error);
        res.status(500).render('home', { authenticated: req.session.authenticated })
    }
};

/**
 * Adds users to the database and sends a confirmation email.
 * 
 * @returns {Promise<void>} - A promise that resolves when the user is added successfully.
 * @throws {Error} - If an error occurs while adding the user or sending confirmation email.
 */
const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            // If the email is already in use, render the sign-up page again with an error message
            return res.render('signupPage', {
                authenticated: req.session.authenticated,
                error: 'Email already registered',
                formData: { name, email }
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new user object
        const newUser = new userModel({
            name,
            email,
            verified: false,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Generate email confirmation token
        const secret = jwtSecret + email;
        const payload = { email };
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        // Compose email message
        const confirmationLink = `${baseUrl}/setup/email/${token}`;
        const subject = 'Biolink account email confirmation';
        const body = `Please click the following link to confirm your email: ${confirmationLink}`;

        // Send confirmation email
        sendEmail(email, subject, body);

        // Set session variables
        req.session.authenticated = true;
        req.session.userID = newUser._id;
        req.session.name = name;
        req.session.email = email;
        req.session.cookie.maxAge = expireTime;

        // Redirect user to home page
        return res.redirect('/home');
    } catch (error) {
        console.log('Error adding user:', error);
        res.status(500).render('signupPage', { authenticated: req.session.authenticated, error: 'Error adding user', formData: { name, email }});
    }
};


module.exports = {
    displayPage,
    addUser,
};
