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
        const secret = process.env.JWT_SECRET + user.password;
        const payload = jwt.verify(token, secret);
        next();
    } catch (error) {
        console.error('Token validation error:', error.message);
        res.redirect('/recover');
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

async function hasSecurityAnswer(req, res, next) {
    const email = req.session.email;
    let user = await User.findOne({ email: email, recovery: { $exists: true }});
    if (user) {
        next();
    } else {
        res.redirect('/security_question');
    }
}

module.exports = {
    sessionValidation,
    validateToken,
    recoveryAnswerValidation,
    hasSecurityAnswer,
}
