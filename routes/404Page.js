const express = require('express');
const router = express.Router();
const NotFoundController = require('../controllers/NotFoundController');

router.get('/', NotFoundController.displayPage);

module.exports = router;