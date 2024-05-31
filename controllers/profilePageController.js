/**
 * Express controller function for handling frontend profile page such as displaying it along with interactions with MongoDB.
 * 
 * This module contains functions to display the profile page along with the setup page.
 * 
 */

// Import required models
const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');

// Function to display the profile page
const displayPage = async (req, res) => {
  try {
    // Fetch user and body composition data from the database
    const userData = await User.findOne({ email: req.session.email });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });

    // Construct user object with fetched data
    const user = {
      username: userData.name || "--",
      email: userData.email || "--",
      id: userData._id.toString().substring(3, 13) || "--",
      dob: userData.dob ? userData.dob.toISOString().substring(0, 10) : "--",
      sex: userData.sex || "--",
      weight: bodyCompData?.weight ?? "--",
      height: bodyCompData?.height ?? "--"
    };

    // Render the profile page with user data
    res.render('profile', {
      user,
      authenticated: req.session.authenticated,
    });
  } catch (error) {
    // Send 500 status code on error
    console.log('Error rendering profile page:', error);
    res.status(500).render('home', { authenticated: req.session.authenticated })
  }
};

// Function to display the profile setup page
const displaySetupPage = async (req, res) => {
  try {
    // Render the profile setup page with authentication status
    res.render('profileSetUp', { authenticated: req.session.authenticated });
  } catch (error) {
    // Send 500 status code on error
    console.log('Error rendering profile setup page:', error);
    res.status(500).send(error);
  }
};

// Export the functions
module.exports = {
  displayPage,
  displaySetupPage,
};
