const sendEmail = require('../utils/sendEmail');
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const displayPage = async (req, res) => {
    try {
        res.render('emailVerification', { authenticated: req.session.authenticated, name: req.session.name, email: req.session.email});
    } catch (error) {
        res.status(500).send(error);
    }
}

const sendConfirmationEmail = async (req, res) => {
    const email = req.session.email;
    console.log(email);
    try {
        const secret = jwtSecret + email;
        const payload = { email: email };
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        const subject = 'Biolink account email confirmation';
        const body = `Please click the following link to confirm your email: http://localhost:3000/verify/email/${token}.`;

        await sendEmail(email, subject, body);

        res.redirect('/home');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).send('An error occurred while sending the confirmation email.');
    }
}

const verifyEmail = async (req, res) => {
    const token = req.params.token;
    const email = req.session.email;

    try { 
        const secret = jwtSecret + email;
        const decoded = jwt.verify(token, secret);


        const user = await User.findOneAndUpdate({ email: email }, { verified: true });

        if (!user) {
            return res.status(404).send('User not found');
        }

    } catch (error) {
        console.error('Error verifying email:', error);
    }
    return res.redirect('/home');
};

module.exports = {
    displayPage,
    sendConfirmationEmail,
    verifyEmail,
};
