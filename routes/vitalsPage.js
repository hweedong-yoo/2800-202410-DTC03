/**
 * Express router for handling the vitals page.
 * 
 * This module defines a route for displaying the vitals page
 * when the root URL of the vitals section is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const vitalsPageController = require('../controllers/vitalsPageController');

// Define route for vitals page
router.get('/', vitalsPageController.displayPage);

module.exports = router;