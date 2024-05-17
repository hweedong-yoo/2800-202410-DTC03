const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const session = require('express-session');

const expireTime = 60 * 60 * 1000;

const displayPage = async (req, res) => {
    try {
        if (req.session.authenticated) {
            return res.redirect('/home');
        }
        res.render('loginPage', { error: req.query.error });
    } catch (error) {
        res.status(500).send(error);
    }
};

const authenticateUser = async (req, res) => {
    try {
        const { password, email } = req.body;

        // Validate request body
        const schema = Joi.object({
            password: Joi.string().max(255).required(),
            email: Joi.string().email().max(255).required()
        });

        const validationResult = schema.validate({ password, email });
        
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.redirect('/login?error=invalidPassword');
        }
        else {
            // Authentication successful
            req.session.authenticated = true;
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.cookie.maxAge = expireTime;
            console.log(user)
            res.redirect('/home')
        }
    } catch (error) {
        console.error("Error in authenticateUser:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    displayPage,
    authenticateUser,
};
