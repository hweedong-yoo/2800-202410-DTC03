// Import required models
const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');
const Blood = require('../models/bloodModels');
const Vitals = require('../models/vitalsModel');

// Function to display the home page
const displayHomePage = async (req, res) => {
  try {
    // Fetch user, vitals, blood, and body composition data from the database
    const userData = await User.findOne({ email: req.session.email });
    const vitalsData = await Vitals.findOne({ userID: req.session.userID });
    const BloodData = await Blood.findOne({ userID: req.session.userID });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });

    // Define status icons and colors
    const goodStats = {
      icon: 'check_circle',
      colour: '#289322'
    };

    const badStats = {
      icon: 'cancel',
      colour: '#B22F2F'
    };

    // Construct user object with fetched data and status
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
    };

    // Render the home page with user data
    res.render('home', {
      user,
      authenticated: req.session.authenticated
    });
  } catch (error) {
    // Log error and send 500 status code
    console.log(error);
    res.status(500).send(error);
  }
};

// Function to display the vitals page
const displayVitalsPage = async (req, res) => {
  try {
    // Render the vitals page with authentication status
    res.render('vitalsPage', { authenticated: req.session.authenticated, userID: req.session.userID });
  } catch (error) {
    // Send 400 status code on error
    res.status(400).send(error);
  }
};

// Function to display the body composition page
const displayBodyCompPage = async (req, res) => {
  try {
    // Fetch body composition data and user data from the database
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });
    const userData = await User.findOne({ _id: req.session.userID });

    if (!bodyCompData.tScore) {
      await BodyComp.findOneAndUpdate({ userID: req.session.userID },
        {
          tScore: 1,
        },
      );

    }

    // Update vulnerabilities if tScore is less than 1
    if (bodyCompData && bodyCompData.tScore < 1) {
      let tempVulnerabilities = "bones";
      await BodyComp.findOneAndUpdate({ userID: req.session.userID },
        {
          vulnerabilities: [tempVulnerabilities],
        },
      );
    }

    // Render the body composition page with user data
    res.render('bodyComposition', {
      authenticated: req.session.authenticated,
      userId: req.session.userID,
      userBMI: bodyCompData?.BMI ?? "undefined",
      userBF: bodyCompData?.BF ?? "undefined",
      userWeight: bodyCompData?.weight ?? "undefined",
      userHeight: bodyCompData?.height ?? "undefined",
      userTscore: bodyCompData?.tScore ?? "undefined",
      userGender: userData?.sex ?? "M",
    });
  } catch (error) {
    // Log error and send 400 status code
    console.log(error);
    res.status(400).send(error);
  }
};

// Function to display the blood page
const displayBloodPage = async (req, res) => {
  try {
    const userID = req.session.userID;

    // Fetch blood data from the database
    const bloodData = await Blood.findOne({ userID });

    // Extract latest values from blood data
    const wbcCount = bloodData.wbc[bloodData.wbc.length - 1];
    const rbcCount = bloodData.rbc[bloodData.rbc.length - 1];
    const plateletsCount = bloodData.platelets[bloodData.platelets.length - 1];
    const glucoseCount = bloodData.glucose[bloodData.glucose.length - 1];
    const calciumCount = bloodData.calcium[bloodData.calcium.length - 1];
    const bunCount = bloodData.bun[bloodData.bun.length - 1];
    const creatinineCount = bloodData.creatinine[bloodData.creatinine.length - 1];
    const altCount = bloodData.alt[bloodData.alt.length - 1];
    const astCount = bloodData.ast[bloodData.ast.length - 1];

    // Initialize vulnerabilities array
    let vulnerabilities = [];

    // Check for immunity vulnerabilities
    const showImmunity = (wbcCount < 4000 || wbcCount > 11000);
    if (showImmunity) {
      vulnerabilities.push("immunity");
    }

    // Check for hematology vulnerabilities
    const showHematology = (rbcCount < 4.2 || rbcCount > 6.1) || (plateletsCount < 150000 || plateletsCount > 450000);
    if (showHematology) {
      vulnerabilities.push("hematology");
    }

    // Check for kidney vulnerabilities
    const showKidney = (calciumCount < 8.5 || calciumCount > 10.5) || (bunCount < 7 || bunCount > 20) || (creatinineCount < 0.6 || creatinineCount > 1.3);
    if (showKidney) {
      vulnerabilities.push("kidney");
    }

    // Check for liver vulnerabilities
    const showLiver = (glucoseCount < 70 || glucoseCount > 140) || (altCount < 7 || altCount > 56) || (astCount < 10 || astCount > 40);
    if (showLiver) {
      vulnerabilities.push("liver");
    }

    // Update blood data with vulnerabilities
    const BloodData = await Blood.findOneAndUpdate({ userID },
      {
        vulnerabilities: vulnerabilities
      }, { new: true }
    );

    // Render the blood page with blood data
    res.render('bloodPage', { authenticated: req.session.authenticated, bloodData });
  } catch (error) {
    // Send 400 status code on error
    res.status(400).send(error);
  }
};

// Function to get user information
const getUserInfo = async (req, res) => {
  userID = req.params.id;
  try {
    // Fetch user vitals information from the database
    const userVitalInfo = await Vitals.findOne({ userID: userID });
    res.send(userVitalInfo);
  } catch (error) {
    // Log error and send 400 status code
    console.log(error);
    res.status(400).send(error);
  }
};

// Export the functions
module.exports = {
  displayHomePage,
  displayVitalsPage,
  displayBodyCompPage,
  displayBloodPage,
  getUserInfo,
};
