const User = require('../models/userModels');
const BodyComp = require('../models/bodyCompModels');

const displayPage = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.session.email });
    const bodyCompData = await BodyComp.findOne({ userID: req.session.userID });

    const user = {
      username: userData.name || "--",
      email: userData.email || "--",
      id: userData._id.toString().substring(3, 13) || "--",
      dob: userData.dob ? userData.dob.toISOString().substring(0, 10) : "--",
      sex: userData.sex || "--",
      weight: bodyCompData && bodyCompData.weight ? bodyCompData.weight : "--",
      height: bodyCompData && bodyCompData.height ? bodyCompData.height : "--"
    }
    
    res.render('profile',{
      user,
      authenticated : req.session.authenticated,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  displayPage,
  logout,
};