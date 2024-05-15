const express = require('express');
const router = express.Router();
const singupPageController = require('../controllers/singupPageController');

router.get('*', singupPageController.displayPage);
router.post('*', singupPageController.addUser);

module.exports = router;