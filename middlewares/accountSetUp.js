
const User = require('../models/userModels');

/**
 * Middleware to check if the user's email is verified.
 * If the user is not verified or the verification status is undefined, redirects to the email setup page.
 * 
 */
async function emailVerification(req, res, next) {
    const userID = req.session.userID;
    let user;
    
    try {
        user = await User.findById(userID);
    } catch (err) {
        return next(err); // Pass any database errors to the error-handling middleware
    }
    
    if (user && (typeof user.verified === 'undefined' || user.verified === false)) {
        // User exists and is either not verified or verification status is undefined
        return res.redirect('/setup/email');
    }

    next();
}

/**
 * Middleware to check if the user's profile setup is complete.
 * If the user does not have a date of birth (dob) set, redirects to the profile setup page.
 * 
 */
async function profileSetup(req, res, next) {
    const email = req.session.email;
    let user;
    
    try {
        user = await User.findOne({ email: email, dob: { $exists: true }});
    } catch (err) {
        return next(err); // Pass any database errors to the error-handling middleware
    }
    
    if (user) {
        // User profile setup is complete
        next();
    } else {
        // User profile setup is not complete
        return res.redirect('/setup/profile');
    }
}

module.exports = { 
    emailVerification,
    profileSetup
};
