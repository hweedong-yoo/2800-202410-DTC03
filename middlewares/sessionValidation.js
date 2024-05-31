const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

async function sessionValidation(req, res, next) {
    if (req.session.authenticated) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

async function validateToken(req, res, next) {
    const { id, token } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.redirect('/recover');
        }
        const secret = jwtSecret  + user.password;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        console.error('Token validation error:', error.message);
        return res.status(500).render('recoveryEmail', { authenticated: req.session.authenticated, error: 'Expired or Invalid link.'});
    }
}

async function recoveryAnswerValidation(req, res, next) {
    if (req.session.recoveryAnswer) {
        next();
    }
    else {
        res.redirect('/recover');
    }
}

async function haveSecurityAnswer(req, res, next) {
    const email = req.session.email;
    let user = await User.findOne({ email: email, recovery: { $exists: true }});
    if (user) {
        next();
    } else {
        res.redirect('/setup/securityquestion');
    }
}

module.exports = {
    sessionValidation,
    validateToken,
    recoveryAnswerValidation,
    haveSecurityAnswer,
}
