/**
 * Express router for handling the edit profile page.
 * 
 * This module defines routes for displaying and editing the profile page.
 * The GET request displays the edit profile page, and the POST request
 * allows users to submit changes to their profile information.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const editProfilePageController = require('../controllers/editProfilePageController');

// Define route for displaying the edit profile page
router.get('/', editProfilePageController.displayPage);

// Define route for submitting profile information edits
router.post('/', editProfilePageController.editInformation);

module.exports = router;