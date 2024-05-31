/**
 * Express router for login page and related functionality.
 * 
 * This module defines routes for displaying the login page
 * and authenticating user credentials.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const loginPageController = require('../controllers/loginPageController');

// Define routes for login page
router.get('/', loginPageController.displayPage);
router.post('/', loginPageController.authenticateUser);

module.exports = router;