const userModel = require('../models/userModels');
const { securityAnswerSchema } = require('../validation/authValidation');
const session = require('express-session');
const bcrypt = require('bcrypt');

const displayPage = async (req, res) => {
    try {
        res.render('securityQuestion', { authenticated: req.session.authenticated });
    } catch (error) {
        res.status(400).send(error);
    }
};

const addSecurityQuestion = async (req, res) => {
    try {
        const { securityAnswer, securityQuestion } = req.body;
        console.log(securityAnswer, securityQuestion);

        const validationResult = securityAnswerSchema.validate({ answer: securityAnswer });
        if (validationResult.error) {
            console.log(validationResult.error.details[0].context.key);
            return res.redirect(`/security_question?missing=${validationResult.error.details[0].context.key}`);
        }

        const hashedSecurityQuestion = await bcrypt.hash(securityQuestion, 8);
        const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 8);

        const email = req.session.email;
        await userModel.findOneAndUpdate({ email: email }, { recovery: hashedSecurityQuestion, recovery_key: hashedSecurityAnswer });

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};



module.exports = {
    displayPage,
    addSecurityQuestion,
};
