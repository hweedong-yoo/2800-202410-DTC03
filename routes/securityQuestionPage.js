/**
 * Express router for security question page and related functionality.
 * 
 * This module defines routes for displaying the security question page
 * and adding security questions for user accounts.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const securityQuestionController = require('../controllers/securityQuestionController');

// Define routes for security question page
router.get('/', securityQuestionController.displayPage);
router.post('/', securityQuestionController.addSecurityQuestion);

module.exports = router;
