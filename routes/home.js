const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');

router.get('/', homePageController.displayHomePage);
router.get('/vitals', homePageController.displayVitalsPage);
router.get('/bloodcomposition', homePageController.displayBloodPage);
router.get('/bodycomposition', homePageController.displayBodyCompPage);

module.exports = router;