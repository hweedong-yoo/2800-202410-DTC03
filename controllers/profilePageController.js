const displayPage = async (req, res) => {
  try {
    const user = {
      id: req.session.id.substring(3, 16),
      username: req.session.name,
      email: req.session.email,
      dob: req.session.dob,
      sex: req.session.sex,
      weight: req.session.weight,
      height: req.session.height
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