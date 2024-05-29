const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');
const Blood = require('../models/bloodModels');
const Vitals = require('../models/vitalsModel');

const displayHomePage = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.session.email });
    const vitalsData = await Vitals.findOne({ userID: req.session.userID });
    const BloodData = await Blood.findOne({ userID: req.session.userID });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });

    const goodStats = {
      icon: 'check_circle',
      colour: '#289322'
    }

    const badStats = {
      icon: 'cancel',
      colour: '#B22F2F'
    }

    const user = {
      name: userData.name || "",
      bpm: vitalsData?.BPM?.[vitalsData.BPM.length - 1]?.value ?? "--",
      temp: vitalsData?.temperature?.[vitalsData.temperature.length - 1]?.value ?? "--",
      rrp: vitalsData?.respiratoryRate?.[vitalsData.respiratoryRate.length - 1]?.value ?? "--",
      bmi: bodyCompData?.BMI ?? "--",
      bf: bodyCompData?.BF ?? "--",
      weight: bodyCompData?.weight ?? "--",
      wbc: BloodData?.wbc?.[BloodData.wbc.length - 1] ?? "--",
      rbc: BloodData?.rbc?.[BloodData.rbc.length - 1] ?? "--",
      vitalsStatus: vitalsData?.vulnerabilities?.length > 0 ? badStats : goodStats,
      bloodStatus: BloodData?.vulnerabilities?.length > 0 ? badStats : goodStats,
      bodyStatus: bodyCompData?.vulnerabilities?.length > 0 ? badStats : goodStats
    }

    res.render('home', {
      user,
      authenticated: req.session.authenticated
    });
  } catch (error) {
    console.log(error)
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


const displayBodyCompPage = async (req, res) => {
  try {
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });
    const userData = await User.findOne({ _id: req.session.userID });

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
        BMI: bodyCompData.BMI ,
        BF:  bodyCompData.BF  ,
        tScore: tempTScore,
        vulnerabilities: [tempVulnerabilities]
      }, { new: true }
    );
    res.render('bodyComposition', {
      authenticated: req.session.authenticated,
      userId: req.session.userID,
      userBMI: updatedBodyComp.BMI || "--",
      userBF: updatedBodyComp.BF || "--",
      userWeight: updatedBodyComp.weight|| "--",
      userHeight: updatedBodyComp.height|| "--",
      userTscore: updatedBodyComp.tScore|| "--",
      userGender: userData.sex || "--",
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