// Import the necessary modules
const User = require('../models/userModels'); // User model for database interactions
const jwt = require('jsonwebtoken'); // JSON Web Token for token verification
const jwtSecret = process.env.JWT_SECRET; // Secret key for JWT from environment variables

/**
 * Middleware to validate if a user session is authenticated.
 * If the session is authenticated, proceed to the next middleware/route handler.
 * Otherwise, redirect the user to the login page.
 * 
 */
async function sessionValidation(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

/**
 * Middleware to validate a JWT token for password recovery.
 * Extracts the user ID and token from the request parameters, finds the user,
 * and verifies the token using a secret composed of the JWT secret and the user's password.
 * If valid, proceeds to the next middleware/route handler.
 * If invalid, redirects to the recovery page or renders an error message.
 * 
 */
async function validateToken(req, res, next) {
    const { id, token } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.redirect('/recover');
        }
        const secret = jwtSecret + user.password;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        console.error('Token validation error:', error.message);
        return res.status(500).render('recoveryEmail', { authenticated: req.session.authenticated, error: 'Expired or Invalid link.' });
    }
}

/**
 * Middleware to validate if the session contains a recovery answer.
 * If the recovery answer is present in the session, proceed to the next middleware/route handler.
 * Otherwise, redirect the user to the recovery page.
 * 
 */
async function recoveryAnswerValidation(req, res, next) {
    if (req.session.recoveryAnswer) {
        next();
    } else {
        res.redirect('/recover');
    }
}

/**
 * Middleware to check if the user has a security answer set up.
 * Retrieves the user's email from the session and checks if the user exists with a recovery field in the database.
 * If the user has a security answer set up, proceed to the next middleware/route handler.
 * Otherwise, redirect the user to the security question setup page.
 * 
 */
async function haveSecurityAnswer(req, res, next) {
    const email = req.session.email;
    let user = await User.findOne({ email: email, recovery: { $exists: true }});
    if (user) {
        next();
    } else {
        res.redirect('/setup/securityquestion');
    }
}

// Export the middleware functions
module.exports = {
    sessionValidation,
    validateToken,
    recoveryAnswerValidation,
    haveSecurityAnswer,
}
