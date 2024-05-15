const express = require('express');
const router = express.Router();
const securityQuestionController = require('../controllers/securityQuestionController');

router.get('/', securityQuestionController.displayPage);

module.exports = router;