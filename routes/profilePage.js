const express = require('express');
const router = express.Router();
const profilePageController = require('../controllers/profilePageController');


router.get('/', profilePageController.displayPage);
router.post('/', profilePageController.logout); 

module.exports = router;