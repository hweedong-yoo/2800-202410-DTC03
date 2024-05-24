const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');
const Blood = require('../models/bloodModels');
const Vitals = require('../models/vitalsModel');

const moment = require('moment');

const displayHomePage = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.session.email });
    const vitalsData = await Vitals.findOne({ userID: req.session.userID });
    const BloodData = await Blood.findOne({ userID: req.session.userID });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });

    const getVitalsStats = (data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        const lastEntry = data[data.length - 1];
        const entryData = lastEntry._doc || lastEntry;
        console.log('entryData["1"]:', entryData["1"]);
        return entryData["1"] !== undefined ? entryData["1"] : "--";
      }
      return "--";
    };

    const user = {
      name: userData.name || "",
      bpm: getVitalsStats(vitalsData.BPM),
      temp: getVitalsStats(vitalsData.temperature),
      rrp: getVitalsStats(vitalsData.respiratoryRate),
      bmi: bodyCompData && bodyCompData.BMI ? bodyCompData.BMI : "--",
      bf: bodyCompData && bodyCompData.BF ? bodyCompData.BF : "--",
      weight: bodyCompData && bodyCompData.weight ? bodyCompData.weight : "--",
      wbc: BloodData.wbc[BloodData.wbc.length - 1] || "--",
      rbc: BloodData.rbc[BloodData.rbc.length - 1] || "--",
      vitalsStatus: vitalsData && vitalsData.vulnerabilities && vitalsData.vulnerabilities.length > 1 ? 'cancel' : 'check_circle',
      bloodStatus: BloodData && BloodData.vulnerabilities && BloodData.vulnerabilities.length > 1 ? 'cancel' : 'check_circle',
      bodyStatus: bodyCompData && bodyCompData.vulnerabilities && bodyCompData.vulnerabilities.length > 1 ? 'cancel' : 'check_circle'
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
    res.render('vitalsPage', { authenticated: req.session.authenticated, userID: req.session.userID });
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
    var tempTScore;
    if (!bodyCompData.tScore) {
      tempTScore = 1;
    }
    else {
      tempTScore = bodyCompData.tScore;
    }
    var tempVulnerabilities = '';
    if (tempTScore < 1) {
      tempVulnerabilities += "bones";
    }
    var updatedBodyComp = await BodyComp.findOneAndUpdate({ userID: req.session.userID },
      {
        BMI: bmi || "--",
        BF: bf || "--",
        tScore: tempTScore || "--",
        vulnerabilities: [tempVulnerabilities]
      }, { new: true }
    );
    res.render('bodyComposition', {
      authenticated: req.session.authenticated,
      userId: req.session.userID,
      userBMI: updatedBodyComp.BMI,
      userBF: updatedBodyComp.BF,
      userWeight: updatedBodyComp.weight,
      userHeight: updatedBodyComp.height,
      userTscore: updatedBodyComp.tScore,
      userGender: userData.sex,
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

    const wbcCount = bloodData.wbc[bloodData.wbc.length - 1];
    const rbcCount = bloodData.rbc[bloodData.rbc.length - 1];
    const plateletsCount = bloodData.platelets[bloodData.platelets.length - 1];
    const glucoseCount = bloodData.glucose[bloodData.glucose.length - 1];
    const calciumCount = bloodData.calcium[bloodData.calcium.length - 1];
    const bunCount = bloodData.bun[bloodData.bun.length - 1];
    const creatinineCount = bloodData.creatinine[bloodData.creatinine.length - 1];
    const altCount = bloodData.alt[bloodData.alt.length - 1];
    const astCount = bloodData.ast[bloodData.ast.length - 1];

    let vulnerabilities = [];

    const showImmunity = (wbcCount < 4000 || wbcCount > 11000);
    if (showImmunity) {
      vulnerabilities.push("immunity");
    }

    const showHematology = (rbcCount < 4.2 || rbcCount > 6.1) || (plateletsCount < 150000 || plateletsCount > 450000);
    if (showHematology) {
      vulnerabilities.push("hematology");
    }

    const showKidney = (calciumCount < 8.5 || calciumCount > 10.5) || (bunCount < 7 || bunCount > 20) || (creatinineCount < 0.6 || creatinineCount > 1.3);
    if (showKidney) {
      vulnerabilities.push("kidney");
    }

    const showLiver = (glucoseCount < 70 || glucoseCount > 140) || (altCount < 7 || altCount > 56) || (astCount < 10 || astCount > 40);
    if (showLiver) {
      vulnerabilities.push("liver");
    }

    const BloodData = await Blood.findOneAndUpdate({ userID },
      {
        vulnerabilities: vulnerabilities
      }, { new: true }
    );

    res.render('bloodPage', { authenticated: req.session.authenticated, bloodData });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserInfo = async (req, res) => {
  userID = req.params.id;
  try {
    const userVitalInfo = await Vitals.findOne({ userID: userID });
    res.send(userVitalInfo);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

module.exports = {
  displayHomePage,
  displayVitalsPage,
  displayBodyCompPage,
  displayBloodPage,
  getUserInfo,
};