
const User = require('../models/userModels');

async function emailVerification(req, res, next) {
    const userID = req.session.userID;
    let user = await User.findById(userID);
    if (user.verified) {
        next();
    } else {
        res.redirect('/verify');
    }
}

async function securityQuestion(req, res, next) {
    const email = req.session.email;
    let user = await User.findOne({ email: email, recovery: { $exists: true }});
    if (user) {
        next();
    } else {
        res.redirect('/security_question');
    }
}

async function profileSetup(req, res, next) {
    const email = req.session.email;
    let user = await User.findOne({ email: email, profile: { $exists: true }});
    if (user) {
        next();
    } else {
        res.redirect('/setup_profile');
    }
}

module.exports = { 
    emailVerification,
    securityQuestion,
    profileSetup };
