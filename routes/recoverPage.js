const express = require('express');
const router = express.Router();
const landingPageController = require('../controllers/recoverPageController');

router.get('/', recoverPageController.displayPage);

module.exports = router;