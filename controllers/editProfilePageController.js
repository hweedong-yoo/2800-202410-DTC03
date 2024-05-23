const User = require('../models/userModels');

const displayPage = async (req, res) => {
  try {
    const user = {
      dob: req.session.dob ? req.session.dob : "yyyy-mm-dd",
      sex: req.session.sex ? req.session.sex : "Any",
      weight: req.session.weight ? req.session.weight : 0,
      height: req.session.height ? req.session.height : 0
    }

    res.render('editProfile', { authenticated: req.session.authenticated });
  } catch (error) {
    res.status(500).send(error);
  }
};

const editInformation = async (req, res) => {
  try {
    const { birthday, gender, weight, height } = req.body;
    const userID = req.session.userID;
    const email = req.session.email;

    console.log('Received data:', req.body);

    if (birthday) {
      req.session.dob = birthday
      await User.findOneAndUpdate(
        { email: email },
        { dob: birthday }
      );
    }

    if (gender) {
      req.session.sex = gender
      await User.findOneAndUpdate(
        { email: email },
        { sex: gender }
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