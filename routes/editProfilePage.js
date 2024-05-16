const express = require('express');
const router = express.Router();
const editProfilePageController = require('../controllers/editProfilePageController');

router.get('/', editProfilePageController.displayPage);
router.post('/', editProfilePageController.editInformation);

module.exports = router;