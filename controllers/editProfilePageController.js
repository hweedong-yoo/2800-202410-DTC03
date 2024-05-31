/**
 * Express controller function for editting profile.
 * 
 * This module contains functions to handle the editing within the profile page
 * including adding, editing, retrieving user information from MongoDB.
 * 
 */


// Import required models and mock data
const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');
const addMockData = require('../utils/mockData');

// Import the moment library for date manipulation
const moment = require('moment');

// Controller to display the profile editing page
const displayPage = async (req, res) => {
  try {
    // Fetch user and body composition data from the database
    const userData = await User.findOne({ email: req.session.email });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });

    // Create a user object with necessary details
    const user = {
      dob: userData.dob ? userData.dob.toISOString().substring(0, 10) : "yyyy-mm-dd",
      sex: userData.sex ? userData.sex : "",
      weight: bodyCompData?.weight ?? null,
      height: bodyCompData?.height ?? null
    };

    // Render the editProfile view with user data and authentication status
    res.render('editProfile', {
      user,
      authenticated: req.session.authenticated,
    });
  } catch (error) {
    // Handle any errors and send a 500 status response
    res.status(500).send(error);
  }
};

// Controller to display the profile setup page
const displaySetUpPage = async (req, res) => {
  try {
    // Fetch user data based on session email
    const user = await User.findOne({ email: req.session.email });
    // Redirect to home page if date of birth is already set
    if (user.dob) {
      res.redirect('/home');
    }

    // Render the setUpProfile view with user data and authentication status
    res.render('setUpProfile', {
      user,
      authenticated: req.session.authenticated,
    });
  } catch (error) {
    // Handle any errors and send a 500 status response
    res.status(500).send(error);
  }
};

// Utility function to calculate age from date of birth
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

// Controller to handle adding initial information to the user profile
const addInitialInformation = async (req, res) => {
  try {
    const { birthday, gender, weight, height } = req.body;
    const userID = req.session.userID;

    let updateUserData = {};
    if (birthday) updateUserData.dob = birthday;
    if (gender) updateUserData.sex = gender;

    // Update users collection with birthday and/or gender if provided
    if (Object.keys(updateUserData).length > 0) {
      await User.findOneAndUpdate(
        { email: req.session.email },
        updateUserData
      );
    }

    let updateBodyCompData = {};
    if (weight && weight > 0 && weight < 300) updateBodyCompData.weight = weight;
    if (height && height > 0 && height < 300) updateBodyCompData.height = height;

    // Calculate BMI if both weight and height are provided
    if (updateBodyCompData.weight && updateBodyCompData.height) {
      const bmi = ((weight / height / height) * 10000).toFixed(1);
      updateBodyCompData.BMI = bmi;

      // Calculate Body Fat percentage if BMI, gender, and birthday are provided
      if (bmi && gender && birthday) {
        let age = calculateAge(birthday);
        if (gender === 'F') {
          updateBodyCompData.BF = ((1.39 * bmi) + (0.16 * age) - 9).toFixed(1);
        } else {
          updateBodyCompData.BF = ((1.39 * bmi) + (0.16 * age) - (10.34 * 1) - 9).toFixed(1);
        }
      }
    }

    console.log("updateBodyCompData", updateBodyCompData);

    // Update body_compositions collection with the calculated data
    if (Object.keys(updateBodyCompData).length > 0) {
      await BodyComp.findOneAndUpdate(
        { userID: req.session.userID },
        updateBodyCompData,
        { upsert: true }
      );
    }

    // Add mock data for the user
    await addMockData(userID);
    res.redirect('/home');

  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// Controller to handle editing user information
const editInformation = async (req, res) => {
  try {
    const { birthday, gender, weight, height } = req.body;

    let updateUserData = {};
    if (birthday) updateUserData.dob = birthday;
    if (gender) updateUserData.sex = gender;

    // Update users collection with birthday and/or gender if provided
    if (Object.keys(updateUserData).length > 0) {
      await User.findOneAndUpdate(
        { email: req.session.email },
        updateUserData
      );
    }

    let updateBodyCompData = {};
    if (weight && weight > 0 && weight < 300) updateBodyCompData.weight = weight;
    if (height && height > 0 && height < 300) updateBodyCompData.height = height;

    // Calculate BMI if both weight and height are provided
    if (updateBodyCompData.weight && updateBodyCompData.height) {
      const bmi = ((weight / height / height) * 10000).toFixed(1);
      updateBodyCompData.BMI = bmi;

      // Calculate Body Fat percentage if BMI, gender, and birthday are provided
      if (bmi && gender && birthday) {
        let age = calculateAge(birthday);
        if (gender === 'F') {
          updateBodyCompData.BF = ((1.39 * bmi) + (0.16 * age) - 9).toFixed(1);
        } else {
          updateBodyCompData.BF = ((1.39 * bmi) + (0.16 * age) - (10.34 * 1) - 9).toFixed(1);
        }
      }
    }

    console.log("updateBodyCompData", updateBodyCompData);

    // Update body_compositions collection with the calculated data
    if (Object.keys(updateBodyCompData).length > 0) {
      await BodyComp.findOneAndUpdate(
        { userID: req.session.userID },
        updateBodyCompData,
        { upsert: true }
      );
    }

    res.redirect('/profile');

  } catch (error) {
    res.status(400).send(error);
  }
};

// Export the controller functions
module.exports = {
  displayPage,
  displaySetUpPage,
  editInformation,
  addInitialInformation,
};
