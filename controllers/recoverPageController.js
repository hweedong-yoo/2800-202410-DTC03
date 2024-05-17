const userModel = require('../models/userModels');
const {expireTime} = require('../server.js');
const { emailSchema, securityAnswerSchema, passwordSchema } = require('../validation/authValidation');
const bcrypt = require('bcrypt');

const displayPageEmail = async (req, res) => {
  try {
    res.render("recoveryEmail", {error: req.query.error});
  } catch (error) {
    res.status(500).send(error);
  }
};

const validateEmail = async (req, res) => {
  try {
    const email = req.body.email;

    const validateEmail = emailSchema.validate({email: email});

    if (validateEmail.error) {
      return res.redirect('/recover?error=invalidEmailFormat');
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
      req.session.email = email;
      req.session.recoveryEmail = true;
      req.session.cookie.maxAge = expireTime;
      res.redirect('/recover/securityQuestion');
    } else {
      req.session.recoveryEmail = false;
      res.redirect('/recover?error=invalidEmail');
    }

  } catch (error) {
    res.status(500).send
  }
};

const displayPageSecurityQuestion = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.session.email });
    const recovery = user.recovery;
    res.render('recoverySecurityQuestion', { recovery: recovery, error: req.query.error});
  } catch (error) {
    res.status(500).send(error);
  }
};

const validateSecurityQuestionAnswer = async (req, res) => {
  try {
    const email = req.session.email;
    const answer = req.body.answer;

    const validateSecurityAnswer = securityAnswerSchema.validate({ answer: answer });

    if (validateSecurityAnswer.error) {
      return res.redirect('/recover/securityquestion?error=invalidSecurityAnswer');
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
      const hashedSecurityAnswer = user.recovery_key;

      const isMatch = await bcrypt.compare(answer, hashedSecurityAnswer);

      if (isMatch) {
        req.session.recoveryAnswer = true;
        res.redirect(`/recover/resetPassword`);
      } else {
        res.redirect('/recover/securityQuestion?error=invalidAnswer');
      }
    } else {
      res.redirect('/recover/securityQuestion?error=invalidEmail');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


const displayPageResetPassword = async (req, res) => {
  try {
    res.render('recoveryResetPassword', {error: req.query.error});
  } catch (error) {
    res.status(500).send(error);
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const email = req.session.email;
    const password = req.body.password;

    const validatePassword = passwordSchema.validate({ password: password });

    if (validatePassword.error) {
      return res.redirect('/recover/resetpassword?error=invalidPasswordFormat');
    }
    
    const hashedPassword = await bcrypt.hash(password, 8);
    await userModel.findOneAndUpdate({ email: email }, { password: hashedPassword });
    
    res.redirect('/login');
  } catch (error) {
    res.status(500).send(error);
  }
};



module.exports = {
  displayPageEmail,
  displayPageSecurityQuestion,
  validateEmail,
  validateSecurityQuestionAnswer,
  displayPageResetPassword,
  resetUserPassword,
}