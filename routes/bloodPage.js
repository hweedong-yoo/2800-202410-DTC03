const express = require('express');
const router = express.Router();
const bloodPageController = require('../controllers/bloodPageController');

router.get('/', bloodPageController.displayPage);

module.exports = router;