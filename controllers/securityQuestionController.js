/**
 * Express controller functions for security question for user validation.
 * 
 * This module contains functions to handle security question for user validation
 * and interact with MongoDB to handle validation resutls. 
 * 
 */

// Import necessary modules
const userModel = require('../models/userModels');
const { securityAnswerSchema } = require('../validation/authValidation');
const bcrypt = require('bcrypt');

// Display security question page
const displayPage = async (req, res) => {
    try {
        res.render('securityQuestion', { authenticated: req.session.authenticated });
    } catch (error) {
        console.log("Error rendering security question page:", error);
        res.status(500).render('home', { authenticated: req.session.authenticated })
    }
};

// Save security question and update to MongoDB 
const saveSecurityQuestion = async (req, res) => {
    try {
        const { securityAnswer, securityQuestion } = req.body;

        const validationResult = securityAnswerSchema.validate({ answer: securityAnswer });
        if (validationResult.error) {
            console.log(validationResult.error.details[0].context.key);
            return res.redirect(`/security_question?missing=${validationResult.error.details[0].context.key}`);
        }
        
        const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 8);

        const email = req.session.email;
        await userModel.findOneAndUpdate({ email: email }, { recovery: securityQuestion, recovery_key: hashedSecurityAnswer });

        res.redirect('/home');
    } catch (error) {
        console.log("Error saving security question:", error);
        res.status(500).render('home', { authenticated: req.session.authenticated });
    }
};



module.exports = {
    displayPage,
    saveSecurityQuestion,
};
