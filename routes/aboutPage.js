/**
 * Express router for handling the about page.
 * 
 * This module defines a route for displaying the about page
 * when the root URL of the about section is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const aboutPageController = require('../controllers/aboutPageController');

// Define route for about page
router.get('/', aboutPageController.displayPage);

module.exports = router;