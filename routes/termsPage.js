const express = require('express');
const router = express.Router();
const termsPageController = require('../controllers/termsPageController');

router.get('/', termsPageController.displayPage);

module.exports = router;