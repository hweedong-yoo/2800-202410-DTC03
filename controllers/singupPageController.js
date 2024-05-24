const userModel = require('../models/userModels');
const sendEmail = require('../utils/sendEmail');
const { signUpSchema } = require('../validation/authValidation');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const expireTime = 60 * 60 * 1000;

const displayPage = async (req, res) => {
    try {
        res.render('signupPage', { authenticated: req.session.authenticated });
    } catch (error) {
        res.status(500).send(error);
    }
};

const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    const validationResult = signUpSchema.validate({ name, email, password });
    if (validationResult.error != null) {
        console.log(validationResult.error.details[0].context.key);
        res.redirect(`/signup?missing=${validationResult.error.details[0].context.key}`);
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new userModel({
            name: name,
            email: email,
            verified: false,
            password: hashedPassword,
        });

        await newUser.save();

        const secret = jwtSecret + email;
        const payload = { email: email };
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        const subject = 'Biolink account email confirmation';
        const body = `Please click the following link to confirm your email: https://two800-202410-dtc03.onrender.com/verify/email/${token}.`;


        sendEmail(email, subject, body)

        req.session.authenticated = true;
        req.session.userID = newUser._id;
        req.session.name = name;
        req.session.email = email;
        req.session.cookie.maxAge = expireTime;

        return res.redirect('/home');
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Error adding user");
    }
};

module.exports = {
    displayPage,
    addUser,

};
