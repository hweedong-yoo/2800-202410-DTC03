const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');
const Blood = require('../models/bloodModels');

const moment = require('moment');

const displayHomePage = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.session.email });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });
    const BloodData = await Blood.findOne({ userID: req.session.userID });

    //Calculate bmi
    let bmi, weight;
    if (bodyCompData && bodyCompData.weight) {
      weight = bodyCompData.weight;
      if (bodyCompData.height) {
        let height = bodyCompData.height;
        bmi = ((weight / height / height) * 10000).toFixed(1);
      }
    }

    //Calculate body fat percentage
    let bf;
    if (userData.dob && bmi) {
      let age = calculateAge(userData.dob.toISOString().substring(0, 10));
      if (userData.dob === 'F') bf = ((1.39 * bmi) + (0.16 * age) - 9).toFixed(1);
      else bf = ((1.39 * bmi) + (0.16 * age) - (10.34 * 1) - 9).toFixed(1);
    }

    const user = {
      name: userData.name || "",
      bpm: 75, // PLACEHOLDER
      temp: 30, //PLACEHOLDER
      rrp: 30, //PLACEHOLDER
      bmi: bmi || "--",
      bf: bf || "--",
      weight: weight || "--",
      wbc: BloodData.wbc[BloodData.wbc.length - 1],
      rbc: BloodData.rbc[BloodData.rbc.length - 1]
    }

    res.render('home', {
      user,
      authenticated: req.session.authenticated
    });
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
      userId: req.session.userID,
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