const express = require('express');
const router = express.Router();
const emailVerificationController = require('../controllers/emailVerificationController');

router.get('/', emailVerificationController.displayPage);
router.post('/', emailVerificationController.sendConfirmationEmail);
router.get('/email/:token', emailVerificationController.verifyEmail);

module.exports = router;
