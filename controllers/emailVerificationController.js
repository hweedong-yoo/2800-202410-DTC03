/**
 * Express controller functions for user password recovery functionality.
 * 
 * This module contains functions to handle user password recovery requests,
 * including rendering recovery pages, validating user input,
 * sending recovery emails, and updating user passwords.
 * 
 */

// Import necessary modules
const userModel = require('../models/userModels');
const sendEmail = require('../utils/sendEmail');
const { expireTime } = require('../server.js');
const { emailSchema, securityAnswerSchema, passwordSchema } = require('../validation/authValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT token generation
const jwtSecret = process.env.JWT_SECRET;

/**
 * Displays the email input page for password recovery.
 * 
 * @returns {Promise<void>} - A promise that resolves when the page is rendered successfully.
 * @throws {Error} - If an error occurs while rendering the page.
 */
const displayPageEmail = async (req, res) => {
  try {
    res.render('recoveryEmail', { authenticated: req.session.authenticated, error: req.query.error, message: req.query.message });
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Validates the email provided for password recovery and sends a recovery link to the user's email.
 * 
 * @returns {void} - Redirects the user based on the validation result.
 * @throws {Error} - If an error occurs during validation or email sending.
 */
const validateEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const validateEmail = emailSchema.validate({ email });

    if (validateEmail.error) {
      return res.redirect('/recover?error=Invalid-email');
    }

    const user = await userModel.findOne({ email });

    if (user) {
      const secret = jwtSecret + user.password;
      const payload = { email, id: user._id };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      const link = `http://localhost:3000/recover/securityQuestion/${user._id}/${token}`;

      const subject = 'Password Recovery';
      const body = `Please click the following link to recover your password: ${link}`;

      sendEmail(email, subject, body);

      res.redirect(`/recover/?message=Please-check-your-email-for-the-recovery-link`);
    } else {
      req.session.recoveryEmail = false;
      res.redirect('/recover?error=Invalid-email');
    }
  } catch (error) {
    console.error('Error validating email:', error);
    res.status(500).send(error);
  }
};

/**
 * Displays the security question input page for password recovery.
 * 
 * @returns {Promise<void>} - A promise that resolves when the page is rendered successfully.
 * @throws {Error} - If an error occurs while rendering the page.
 */
const displayPageSecurityQuestion = async (req, res) => {
  try {
    const { id, token } = req.params;
    const user = await userModel.findById(id);

    res.render('recoverySecurityQuestion', { authenticated: req.session.authenticated, error: req.query.error, recovery: user.recovery });
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Validates the security question answer provided by the user for password recovery.
 * 
 * @returns {void} - Redirects the user based on the validation result.
 * @throws {Error} - If an error occurs during validation or answer comparison.
 */
const validateSecurityQuestionAnswer = async (req, res) => {
  try {
    const { id, token } = req.params;
    const answer = req.body.answer;

    const validateAnswer = securityAnswerSchema.validate({ answer });

    if (validateAnswer.error) {
      return res.redirect(`/recover/securityQuestion/${id}/${token}?error=Invalid-answer`);
    }

    const user = await userModel.findById(id);
    const isMatch = bcrypt.compare(answer, user.recovery_key);

    if (isMatch) {
      req.session.recoveryAnswer = true;
      req.session.cookie.maxAge = expireTime;
      res.redirect(`/recover/resetPassword/${id}/${token}`);
    } else {
      req.session.recoveryAnswer = false;
      res.redirect(`/recover/securityQuestion/${id}/${token}?error=Invalid-answer`);
    }
  } catch (error) {
    console.error('Error validating security question answer:', error);
    res.status(500).send(error);
  }
};

/**
 * Displays the password reset page for password recovery.
 * 
 * @returns {Promise<void>} - A promise that resolves when the page is rendered successfully.
 * @throws {Error} - If an error occurs while rendering the page.
 */
const displayPageResetPassword = async (req, res) => {
  try {
    res.render('recoveryResetPassword', { authenticated: req.session.authenticated, error: req.query.error });
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Resets the user's password based on the provided new password.
 * 
 * @returns {void} - Redirects the user based on the reset result.
 * @throws {Error} - If an error occurs during password validation or updating the user's password.
 */
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
};

module.exports = {
  displayPageEmail,
  displayPageSecurityQuestion,
  validateEmail,
  validateSecurityQuestionAnswer,
  displayPageResetPassword,
  resetUserPassword,
};
