const Blood = require('../models/bloodModels');

const displayHomePage = async (req, res) => {
  try {
    res.render('home', { authenticated: req.session.authenticated });
  } catch (error) {
    res.status(500).send(error);
  }
};

const displayVitalsPage = async (req, res) => {
  try {
    res.render('vitalsPage', { authenticated: req.session.authenticated });
  } catch (error) {
    res.status(400).send(error);
  }
};

const displayBodyCompPage = async (req, res) => {
  try {
    res.render('bodyComposition', { authenticated: req.session.authenticated });
  } catch (error) {
    res.status(400).send(error);
  }
};

const displayBloodPage = async (req, res) => {
  try {
    const userID = req.session.userID;
    console.log('UserID:', userID);

    const bloodData = await Blood.findOne({ userID });
    console.log('Blood Data:', bloodData);

    res.render('bloodPage', { authenticated: req.session.authenticated, bloodData });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  displayHomePage,
  displayVitalsPage,
  displayBodyCompPage,
  displayBloodPage,
};