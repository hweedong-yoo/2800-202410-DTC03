const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');

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