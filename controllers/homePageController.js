const Blood = require('../models/bloodModels');
const BodyComp = require('../models/bodyCompModels');
const User = require('../models/userModels');

const moment = require('moment');

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

function calculateAge(dob) {
  const birthDate = moment(dob);
  const today = moment();
  let age = today.diff(birthDate, 'years');

  // Adjust if the birthday hasn't occurred yet this year
  if (today.month() < birthDate.month() || (today.month() === birthDate.month() && today.date() < birthDate.date())) {
    age--;
  }

  return age;
}


const displayBodyCompPage = async (req, res) => {
  try {
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });
    const userData = await User.findOne({ _id: req.session.userID });

    var isoStringDob = userData.dob.toISOString().substring(0, 10)
    res.render('bodyComposition', {
      authenticated: req.session.authenticated,
      userWeight: bodyCompData.weight,
      userHeight: bodyCompData.height,
      userTscore: bodyCompData.tScore,
      userGender: userData.sex,
      userAge: calculateAge(isoStringDob),
    });
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

const displayBloodPage = async (req, res) => {
  try {
    const userID = req.session.userID;

    const bloodData = await Blood.findOne({ userID });

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