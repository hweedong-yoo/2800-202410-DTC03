const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  logout,
};