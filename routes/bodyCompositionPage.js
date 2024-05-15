const express = require('express');
const router = express.Router();
const bodyCompositionController = require('../controllers/bodyCompositionController');

router.get('/', bodyCompositionController.displayPage);

module.exports = router;