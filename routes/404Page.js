/**
 * Express router for handling not found (404) errors.
 * 
 * This module defines a route for displaying a not found page
 * when the requested URL does not match any existing routes.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const NotFoundController = require('../controllers/NotFoundController');

// Define route for not found page
router.get('/', NotFoundController.displayPage);

module.exports = router;
