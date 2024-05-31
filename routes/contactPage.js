/**
 * Express router for handling the contact page.
 * 
 * This module defines a route for displaying the contact page
 * when the root URL of the contact section is accessed.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const contactPageController = require('../controllers/contactPageController');

// Define route for contact page
router.get('/', contactPageController.displayPage);

module.exports = router;