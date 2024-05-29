/**
 * Express router for home page and related pages.
 * 
 * This module defines routes for displaying the home page,
 * vitals page, blood composition page, body composition page,
 * and for fetching user information in JSON format.
 * 
 */

// Import necessary modules
const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');

// Define routes for home page and related pages
router.get('/', homePageController.displayHomePage);
router.get('/vitals', homePageController.displayVitalsPage);
router.get('/bloodcomposition', homePageController.displayBloodPage);
router.get('/bodycomposition', homePageController.displayBodyCompPage);
router.get('/vitals/json/:id', homePageController.getUserInfo);

module.exports = router;