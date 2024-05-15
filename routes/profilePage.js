const express = require('express');
const router = express.Router();
const profilePageController = require('../controllers/profilePageController');

router.get('/', profilePageController.displayPage);

module.exports = router;