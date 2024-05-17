const express = require('express');
const router = express.Router();
const recoverPageSessionValidation = require('../middlewares/sessionValidation');
const recoverPageController = require('../controllers/recoverPageController');

router.get('/', recoverPageController.displayPageEmail);
// post route to validate email
router.post('/email', recoverPageController.validateEmail);


router.get('/securityQuestion', recoverPageSessionValidation.recoveryEmailValidation, recoverPageController.displayPageSecurityQuestion);
//post route to validate security question
router.post('/securityQuestion', recoverPageSessionValidation.recoveryEmailValidation, recoverPageController.validateSecurityQuestionAsnwer);


router.get('/resetPassword', recoverPageSessionValidation.recoveryAnswerValidation, recoverPageController.displayPageResetPassword);
//post route to reset password
router.post('/resetPassword', recoverPageSessionValidation.recoveryAnswerValidation, recoverPageController.resetUserPassword);

module.exports = router;