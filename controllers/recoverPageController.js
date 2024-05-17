const displayPage = async (req, res) => {
  try {
    res.render('recoverPage', {authenticated : req.session.authenticated});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  displayPage,
};