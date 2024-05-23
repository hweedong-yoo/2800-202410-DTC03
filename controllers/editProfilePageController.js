const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');

const displayPage = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.session.email });
    const bodyCompData = await BodyComp.findOne({ userID: userData._id });

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
    const email = req.session.email;

    let updateUserData = {};

    if (birthday) {
      req.session.dob = birthday;
      updateUserData.dob = birthday;
    }

    if (gender) {
      req.session.sex = gender;
      updateUserData.sex = gender;
    }

    if (Object.keys(updateUserData).length > 0) {
      await User.findOneAndUpdate(
        { email: email },
        updateUserData
      );
    }


    const user = await User.findOne({ email }).select('_id');
    const userID = user._id;
    console.log('User _id:', userID);

    let updateBodyCompData = {};

    if (weight) {
      req.session.weight = weight;
      updateBodyCompData.weight = weight;
    }

    if (height) {
      req.session.height = height;
      updateBodyCompData.height = height;
    }

    if (Object.keys(updateBodyCompData).length > 0) {
      await BodyComp.findOneAndUpdate(
        { userID: userID },
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