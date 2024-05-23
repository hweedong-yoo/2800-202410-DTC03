const userModel = require('../models/userModels');
const {expireTime} = require('../server.js');
const { emailSchema, securityAnswerSchema, passwordSchema } = require('../validation/authValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const jwtSecret = process.env.JWT_SECRET;
const recoveryEmail = process.env.RECOVERY_EMAIL;
const recoveryPassword = process.env.RECOVERY_PASSWORD;


function sendRecoveryEmail(email, link) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: recoveryEmail,
      pass: recoveryPassword
    }
  });

  var mailOptions = {
    from: recoveryEmail,
    to: email,
    subject: 'Password Recovery Link',
    text: 'Please click the link below to recover your password: ' + link + ' This link will expire in 15 minutes.'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}

const displayPageEmail = async (req, res) => {
  try {
    res.render("recoveryEmail", {authenticated : req.session.authenticated, error: req.query.error, message: req.query.message});
  } catch (error) {
    res.status(500).send(error);
  }
};

const validateEmail = async (req, res) => {
  try {
    const email = req.body.email;

    const validateEmail = emailSchema.validate({email: email});

    if (validateEmail.error) {
      return res.redirect('/recover?error=Invalid-email');
    }

    const user = await userModel.findOne({ email: email });
    
    if (user) {
      const secret = jwtSecret + user.password;
      const payload = {
        email: email,
        id: user._id
        };
      const token = jwt.sign(payload, secret, {expiresIn: '15m'});
      const link = `http://localhost:3000/recover/securityQuestion/${user._id}/${token}`;

      sendRecoveryEmail(email, link);

      res.redirect(`/recover/?message=Please-check-your-email-for-the-recovery-link`);
    } else {
      req.session.recoveryEmail = false;
      res.redirect('/recover?error=Invalid-email');
    }

  } catch (error) {
    res.status(500).send
  }
};

const displayPageSecurityQuestion = async (req, res) => {
  const {id, token} = req.params;
  const user = await userModel.findById(id);

  res.render('recoverySecurityQuestion', {authenticated : req.session.authenticated, error: req.query.error, recovery: user.recovery})
};

const validateSecurityQuestionAnswer = async (req, res) => {
  const {id, token} = req.params;
  const answer = req.body.answer;

 const validateAnswer = securityAnswerSchema.validate({answer: answer});

 if (validateAnswer.error) {
  return res.redirect(`/recover/securityQuestion/${id}/${token}?error=Invalid-answer`);
}


  const user = await userModel.findById(id);

  isMatch = await bcrypt.compare(answer, user.recovery_key);

  if (isMatch) {
    req.session.recoveryAnswer = true;
    req.session.cookie.maxAge = expireTime;
    res.redirect(`/recover/resetPassword/${id}/${token}`);
    
  } else {
    req.session.recoveryAnswer = false;
    res.redirect(`/recover/securityQuestion/${id}/${token}?error=Invalid-answer`);
  }
};

const displayPageResetPassword = async (req, res) => {
  try {
    res.render('recoveryResetPassword', {authenticated : req.session.authenticated, error: req.query.error});
  } catch (error) {
    res.status(500).send(error);
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const newPassword = req.body.password;

    const validatePassword = passwordSchema.validate({ password: newPassword });
    if (validatePassword.error) {
      console.log(validatePassword.error.details[0].message);
      return res.redirect(`/recover/resetpassword/${id}/${token}?error=Invalid-password`);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    
    await userModel.findByIdAndUpdate(id, { password: hashedPassword });

    res.redirect('/login');
  } catch (error) {

    console.error('Error resetting user password:', error);
    res.status(500).send('An error occurred while resetting the password.');
  }
}

module.exports = {
  displayPageEmail,
  displayPageSecurityQuestion,
  validateEmail,
  validateSecurityQuestionAnswer,
  displayPageResetPassword,
  resetUserPassword,
}