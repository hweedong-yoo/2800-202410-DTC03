const Blood = require('../models/bloodModels');
const BodyComp = require('../models/bodyCompModels');
const Vitals = require('../models/vitalsModel');

const displayBodyModelPage = async (req, res) => {
  try {
    const userID = req.session.userID;
    console.log(userID);
    const bloodData = await Blood.findOne({ userID });
    const bloodVulnerability = bloodData?.vulnerabilities ?? "--";
    const bodyCompData = await BodyComp.findOne({ userID });
    const bodyCompVulnerability = bodyCompData?.vulnerabilities ?? "--";
    const vitalsData = await Vitals.findOne({ userID });
    const vitalsVulnerability = vitalsData?.vulnerabilities ?? "--";
    res.render('bodyModel', { authenticated: req.session.authenticated , bloodVul: bloodVulnerability , bodyCompVul: bodyCompVulnerability , vitalsVul: vitalsVulnerability});
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  displayBodyModelPage,
};