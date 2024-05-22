const express = require('express');
const router = express.Router();
const recoverPageSessionValidation = require('../middlewares/sessionValidation');
const recoverPageController = require('../controllers/recoverPageController');

router.get('/', recoverPageController.displayPageEmail);
// post route to validate email
router.post('/email', recoverPageController.validateEmail);


router.get('/securityQuestion/:id/:token', recoverPageSessionValidation.validateToken, recoverPageController.displayPageSecurityQuestion);
//post route to validate security question
router.post('/securityQuestion/:id/:token', recoverPageSessionValidation.validateToken, recoverPageController.validateSecurityQuestionAnswer);


router.get('/resetPassword/:id/:token', recoverPageSessionValidation.validateToken, recoverPageSessionValidation.recoveryAnswerValidation, recoverPageController.displayPageResetPassword);
//post route to reset password
router.post('/resetPassword/:id/:token', recoverPageSessionValidation.validateToken, recoverPageSessionValidation.recoveryAnswerValidation, recoverPageController.resetUserPassword);

module.exports = router;