/**
 * Express router for handling the password recovery process.
 * 
 * This module defines routes for displaying the password recovery pages,
 * validating email, security questions, and resetting the user's password.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const recoverPageSessionValidation = require('../middlewares/sessionValidation');
const recoverPageController = require('../controllers/recoverPageController');

// Route for displaying the email input page
router.get('/', recoverPageController.displayPageEmail);

// POST route to validate email
router.post('/email', recoverPageController.validateEmail);


// Route for displaying the security question input page
router.get('/securityQuestion/:id/:token', recoverPageSessionValidation.validateToken, recoverPageController.displayPageSecurityQuestion);

// POST route to validate security question
router.post('/securityQuestion/:id/:token', recoverPageSessionValidation.validateToken, recoverPageController.validateSecurityQuestionAnswer);

// Route for displaying the password reset page
router.get('/resetPassword/:id/:token', recoverPageSessionValidation.validateToken, recoverPageSessionValidation.recoveryAnswerValidation, recoverPageController.displayPageResetPassword);

// POST route to reset password
router.post('/resetPassword/:id/:token', recoverPageSessionValidation.validateToken, recoverPageSessionValidation.recoveryAnswerValidation, recoverPageController.resetUserPassword);

module.exports = router;