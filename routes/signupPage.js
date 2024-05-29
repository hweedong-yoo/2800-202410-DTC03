/**
 * Express router for signup page and related functionality.
 * 
 * This module defines routes for displaying the signup page
 * and adding new user accounts.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const signupPageController = require('../controllers/singupPageController');

// Define routes for signup page
router.get('/', signupPageController.displayPage);
router.post('/', signupPageController.addUser);

module.exports = router;
