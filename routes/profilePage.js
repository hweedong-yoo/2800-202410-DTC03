/**
 * Express router for handling the profile page.
 * 
 * This module defines routes for displaying the profile page and handling
 * actions related to the user's profile, such as logging out.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const profilePageController = require('../controllers/profilePageController');

// Define route for displaying the profile page
router.get('/', profilePageController.displayPage);

// Define route for logging out from the profile page
router.post('/', profilePageController.logout); 

module.exports = router;