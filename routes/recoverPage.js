const express = require('express');
const router = express.Router();
const recoverPageController = require('../controllers/recoverPageController');

router.get('/', recoverPageController.displayPage);

module.exports = router;