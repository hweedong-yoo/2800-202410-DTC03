const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');

const moment = require('moment');

const displayPage = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.session.email });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });

    const user = {
      dob: userData.dob ? userData.dob.toISOString().substring(0, 10) : "yyyy-mm-dd",
      sex: userData.sex ? userData.sex : "",
      weight: bodyCompData && bodyCompData.weight ? bodyCompData.weight : null,
      height: bodyCompData && bodyCompData.height ? bodyCompData.height : null
    }

    res.render('editProfile', {
      user,
      authenticated: req.session.authenticated,
    });
  } catch (error) {
    res.status(500).send(error);
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

const editInformation = async (req, res) => {
  try {
    const { birthday, gender, weight, height } = req.body;

    let updateUserData = {};

    if (birthday) updateUserData.dob = birthday;
    if (gender) updateUserData.sex = gender;

    if (Object.keys(updateUserData).length > 0) {
      await User.findOneAndUpdate(
        { email: req.session.email },
        updateUserData
      );
    }


    let updateBodyCompData = {};

    if (weight) updateBodyCompData.weight = weight;
    if (height) updateBodyCompData.height = height;

    //Calculate BMI
    if (weight && height) {
      const bmi = ((weight / height / height) * 10000).toFixed(1);
      updateBodyCompData.BMI = bmi;

      //Calculate Body Fat percentage
      if (bmi && gender && birthday) {
        let age = calculateAge(birthday);
        if (gender === 'F') {
          updateBodyCompData.BF = ((1.39 * bmi) + (0.16 * age) - 9).toFixed(1);
        }
        else {
          updateBodyCompData.BF = ((1.39 * bmi) + (0.16 * age) - (10.34 * 1) - 9).toFixed(1);
        }
      }
    }

    console.log("updateBodyCompData", updateBodyCompData)


    if (Object.keys(updateBodyCompData).length > 0) {
      await BodyComp.findOneAndUpdate(
        { userID: req.session.userID },
        updateBodyCompData,
        { upsert: true }
      );
    }

    res.redirect('/profile')

  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
  editInformation,
};