const User = require('../models/userModels');

const displayPage = async (req, res) => {
  try {
    const user = {
      dob: req.session.dob ? req.session.dob : "yyyy-mm-dd",
      sex: req.session.sex ? req.session.sex : "Any",
      weight: req.session.weight ? req.session.weight : 0,
      height: req.session.height ? req.session.height : 0
    }

    res.render('editProfile', { user });
    res.render('editProfile', {authenticated : req.session.authenticated});
  } catch (error) {
    res.status(500).send(error);
  }
};

const editInformation = async (req, res) => {
  try {
    const { birthday, gender, weight, height } = req.body;

    const userId = req.session.id;
    const user = await User.findById(userId);

    req.session.dob = birthday || user.profile.dob;
    req.session.sex = gender || user.profile.sex;
    req.session.weight = weight || user.profile.weight;
    req.session.height = height || user.profile.height;


    await userModel.findByIdAndUpdate(
      userId,
      {
        'profile.dob': req.session.dob,
        'profile.sex': req.session.sex,
        'profile.weight': req.session.weight,
        'profile.height': req.session.height
      },
      { new: true } 
    );

    res.redirect('/profile')

  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
  editInformation,
};