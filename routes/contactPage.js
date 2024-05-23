const express = require('express');
const router = express.Router();
const contactPageController = require('../controllers/contactPageController');

router.get('/', contactPageController.displayPage);

module.exports = router;