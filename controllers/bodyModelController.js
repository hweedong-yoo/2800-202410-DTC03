/**
 * Express controller function for rendering the body model page.
 * 
 * This module contains a function to handle the request to render the bpdy model page.
 * 
 */

// Import the necessary models for blood, body composition, and vitals data
const Blood = require('../models/bloodModels');
const BodyComp = require('../models/bodyCompModels');
const Vitals = require('../models/vitalsModel');

// Define an asynchronous function to display the body model page
const displayBodyModelPage = async (req, res) => {
  try {
    // Retrieve the user ID from the session
    const userID = req.session.userID;
    // console.log(userID);

    // Fetch blood data for the user from the Blood model
    const bloodData = await Blood.findOne({ userID });
    // Extract vulnerabilities from the blood data, or set to "--" if not found
    const bloodVulnerability = bloodData?.vulnerabilities ?? "--";

    // Fetch body composition data for the user from the BodyComp model
    const bodyCompData = await BodyComp.findOne({ userID });
    // Extract vulnerabilities from the body composition data, or set to "--" if not found
    const bodyCompVulnerability = bodyCompData?.vulnerabilities ?? "--";

    // Fetch vitals data for the user from the Vitals model
    const vitalsData = await Vitals.findOne({ userID });
    // Extract vulnerabilities from the vitals data, or set to "--" if not found
    const vitalsVulnerability = vitalsData?.vulnerabilities ?? "--";

    // Render the 'bodyModel' view with the fetched data and authentication status
    res.render('bodyModel', {
      authenticated: req.session.authenticated,
      bloodVul: bloodVulnerability,
      bodyCompVul: bodyCompVulnerability,
      vitalsVul: vitalsVulnerability
    });
  } catch (error) {
    // If an error occurs, send a 400 status with the error message
    console.log('Error rendering body model page:', error);
    res.status(500).render('home', { authenticated: req.session.authenticated });
  }
};

// Export the displayBodyModelPage function for use in other parts of the application
module.exports = {
  displayBodyModelPage,
};
