/**
 * Express router for handling account setup.
 * 
 * This module defines routes for setting up a user account, including
 * email verification, setting security questions, and adding profile information.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const emailVerificationController = require('../controllers/emailVerificationController');
const securityQuestionController = require('../controllers/securityQuestionController');
const profileController = require('../controllers/editProfilePageController');
const editProfilePageController = require('../controllers/editProfilePageController');
const { sessionValidation, haveSecurityAnswer } = require('../middlewares/sessionValidation');
const { emailVerification } = require('../middlewares/accountSetUp');

// Route for displaying email verification page
router.get('/email', sessionValidation, emailVerificationController.displayPage);

// POST route to send confirmation email
router.post('/email', sessionValidation, emailVerificationController.sendConfirmationEmail);

// Route for verifying email using token
router.get('/email/:token', sessionValidation, emailVerificationController.verifyEmail);

// Route for displaying security question setup page
router.get('/securityquestion', sessionValidation, emailVerification, securityQuestionController.displayPage);

// POST route to save security question
router.post('/securityquestion', sessionValidation, emailVerification, securityQuestionController.saveSecurityQuestion);

// Route for displaying profile setup page
router.get('/profile', sessionValidation, emailVerification, haveSecurityAnswer, profileController.displaySetUpPage);

// POST route to add initial profile information
router.post('/profile', sessionValidation, emailVerification, haveSecurityAnswer, editProfilePageController.addInitialInformation);

module.exports = router;