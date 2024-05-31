/**
 * Express router for handling user logout.
 * 
 * This module defines a route for logging out users from the application.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

// Define route for user logout
router.post('/', logoutController.logout);

module.exports = router;