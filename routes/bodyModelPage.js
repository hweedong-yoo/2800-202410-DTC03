// Import the Express module
const express = require('express');

// Create a new router object
const router = express.Router();

// Import the controller for handling the body model page
const bodyModelController = require('../controllers/bodyModelController');

// Define a route for the root path ('/') that uses the displayBodyModelPage method from the controller
router.get('/', bodyModelController.displayBodyModelPage);

// Export the router object for use in other parts of the application
module.exports = router;
