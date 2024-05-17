const displayPage = async (req, res) => {
  try {
    const user = {
      username: req.session.name,
      email: req.session.email
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