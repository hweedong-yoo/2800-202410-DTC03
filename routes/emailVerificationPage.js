/**
 * Express router for email verification.
 * 
 * This module defines routes for displaying the email verification page,
 * sending confirmation emails, and verifying user email addresses.
 * 
 */

// Import necessary modul
const express = require('express');
const router = express.Router();
const emailVerificationController = require('../controllers/emailVerificationController');

// Define routes for email verification
router.get('/', emailVerificationController.displayPage);
router.post('/', emailVerificationController.sendConfirmationEmail);
router.get('/email/:token', emailVerificationController.verifyEmail);

module.exports = router;
