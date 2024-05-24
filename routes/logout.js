const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

router.post('/', logoutController.logout);

module.exports = router;