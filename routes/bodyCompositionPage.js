/**
 * Express router for handling the body composition page.
 * 
 * This module defines a route for displaying the body composition page
 * when the root URL of the body composition section is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const bodyCompositionController = require('../controllers/bodyCompositionController');

// Define route for body composition page
router.get('/', bodyCompositionController.displayPage);

module.exports = router;