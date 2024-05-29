const express = require('express');
const router = express.Router();
const vitalsPageController = require('../controllers/vitalsPageController');

router.get('/', vitalsPageController.displayPage);

module.exports = router;