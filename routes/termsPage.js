/**
 * Express router for handling the terms page.
 * 
 * This module defines a route for displaying the terms page
 * when the root URL of the terms section is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const termsPageController = require('../controllers/termsPageController');

// Define route for terms page
router.get('/', termsPageController.displayPage);

module.exports = router;