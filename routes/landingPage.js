const express = require('express');
const router = express.Router();
const landingPageController = require('../controllers/landingPageController');

router.get('/', landingPageController.displayPage);

module.exports = router;