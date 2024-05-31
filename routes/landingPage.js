/**
 * Express router for handling the landing page.
 * 
 * This module defines a route for displaying the landing page
 * when the root URL of the application is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const landingPageController = require('../controllers/landingPageController');

// Define route for landing page
router.get('/', landingPageController.displayPage);

module.exports = router;