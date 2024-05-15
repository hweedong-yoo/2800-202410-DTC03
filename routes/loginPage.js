const express = require('express');
const router = express.Router();
const loginPageController = require('../controllers/loginPageController');

router.get('/', loginPageController.displayPage);
router.post('/', loginPageController.authenticateUser);

module.exports = router;