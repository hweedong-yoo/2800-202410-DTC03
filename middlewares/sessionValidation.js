
function sessionValidation(req, res, next) {
    if (req.session.authenticated) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

function recoveryEmailValidation(req, res, next) {
    if (req.session.recoveryEmail) {
        next();
    }
    else {
        res.redirect('/recover');
    }
}

function recoveryAnswerValidation(req, res, next) {
    if (req.session.recoveryAnswer) {
        next();
    }
    else {
        res.redirect('/recover');
    }
}

module.exports = {
    sessionValidation,
    recoveryEmailValidation,
    recoveryAnswerValidation,
}
