const displayPage = async (req, res) => {
  try {
    res.render('profile');
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