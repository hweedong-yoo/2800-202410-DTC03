const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const displayPage = async (req, res) => {
    try {
        res.render('loginPage');
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
            return res.status(401).send('Invalid email/password combination');
        }
        else {
            // Authentication successful
            res.send('Authentication successful');
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
