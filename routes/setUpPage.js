const express = require('express');
const router = express.Router();
const emailVerificationController = require('../controllers/emailVerificationController');
const securityQuestionController = require('../controllers/securityQuestionController');
const profileController = require('../controllers/editProfilePageController');
const editProfilePageController = require('../controllers/editProfilePageController');
const { sessionValidation, haveSecurityAnswer } = require('../middlewares/sessionValidation');
const { emailVerification } = require('../middlewares/accountSetUp');

router.get('/email', sessionValidation, emailVerificationController.displayPage);
router.post('/email', sessionValidation, emailVerificationController.sendConfirmationEmail);
router.get('/email/:token', sessionValidation, emailVerificationController.verifyEmail);
router.get('/securityquestion', sessionValidation, emailVerification, securityQuestionController.displayPage);
router.post('/securityquestion', sessionValidation, emailVerification, securityQuestionController.saveSecurityQuestion);
router.get('/profile', sessionValidation, emailVerification, haveSecurityAnswer, profileController.displaySetUpPage)
router.post('/profile', sessionValidation, emailVerification, haveSecurityAnswer, editProfilePageController.addInitialInformation);

module.exports = router;