const Blood = require('../models/bloodModels');

const displayPage = async (req, res) => {
  try {
    const userID = req.session.userID;
    console.log(userID);
    const bloodData = await Blood.findOne({ userID });
    const bloodVulnerability = bloodData.vulnerabilities;
    console.log(bloodVulnerability);
    res.render('bodyModel', { authenticated: req.session.authenticated , bloodVul: bloodVulnerability});
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
};