const express = require('express');
const router = express.Router();
const aboutPageController = require('../controllers/aboutPageController');

router.get('/', aboutPageController.displayPage);

module.exports = router;