/**
 * Express router for handling the body model page.
 * 
 * This module defines a route for displaying the body model page
 * when the root URL of the application is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const bodyModelController = require('../controllers/bodyModelController');

// Define route for displaying the body model page
router.get('/', bodyModelController.displayBodyModelPage);

module.exports = router;
