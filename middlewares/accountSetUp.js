
const User = require('../models/userModels');

async function emailVerification(req, res, next) {
    const userID = req.session.userID;
    let user = await User.findById(userID);
    if (user.verified) {
        next();
    } else {
        res.redirect('/setup/email');
    }
}

async function profileSetup(req, res, next) {
    const email = req.session.email;
    let user = await User.findOne({ email: email, dob: { $exists: true }});
    if (user) {
        next();
    } else {
        res.redirect('setup/profile');
    }
}

module.exports = { 
    emailVerification,
    profileSetup
};
