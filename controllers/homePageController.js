const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');
const Blood = require('../models/bloodModels');

const displayHomePage = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.session.email });
    const bodyCompData = await BodyComp.findOne({ userID: userData._id });
    const BloodData = await BodyComp.findOne({ userID: userData._id });

    let bmi, weight;
    if (bodyCompData && bodyCompData.weight) {
      weight = bodyCompData.weight;
      if (bodyCompData.height) {
        let height = bodyCompData.height;
        bmi = ((weight / height / height) * 10000).toFixed(1);
      }
    }

    console.log("bmi", bmi);
    console.log("weight", weight);

    const user = {
      name: userData.name || "",
      bpm: 75, // PLACEHOLDER
      temp: 30, //PLACEHOLDER
      rrp: 30, //PLACEHOLDER
      bmi: bmi || "--",
      bf: 25, // PLACEHOLDER
      weight: weight || "--",
      wbc: 9000, //PLACEHOLDER
      rbc: 5.1 //PLACEHOLDER
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