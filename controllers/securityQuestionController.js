const userModel = require('../models/userModels');
const { securityAnswerSchema } = require('../validation/authValidation');
const bcrypt = require('bcrypt');

const displayPage = async (req, res) => {
    try {
        res.render('securityQuestion', { authenticated: req.session.authenticated });
    } catch (error) {
        res.status(400).send(error);
    }
};

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
        console.error(error);
        res.status(500).send(error);
    }
};



module.exports = {
    displayPage,
    saveSecurityQuestion,
};
