const User = require('../models/userModels');

async function sessionValidation(req, res, next) {
    if (req.session.authenticated) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

async function recoveryEmailValidation(req, res, next) {
    if (req.session.recoveryEmail) {
        next();
    }
    else {
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
    console.log(user)
    if (user) {
        next();
    } else {
        res.redirect('/security_question');
    }
}

module.exports = {
    sessionValidation,
    recoveryEmailValidation,
    recoveryAnswerValidation,
    hasSecurityAnswer,
}
