const express = require('express');
const router = express.Router();
const bodyModelController = require('../controllers/bodyModelController');

router.get('/', bodyModelController.displayPage);

module.exports = router;