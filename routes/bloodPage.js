/**
 * Express router for handling the blood page.
 * 
 * This module defines a route for displaying the blood page
 * when the root URL of the blood section is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const bloodPageController = require('../controllers/bloodPageController');

// Define route for blood page
router.get('/', bloodPageController.displayPage);

module.exports = router;