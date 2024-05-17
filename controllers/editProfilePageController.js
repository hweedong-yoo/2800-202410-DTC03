const displayPage = async (req, res) => {
  try {
    res.render('editProfile', {authenticated : req.session.authenticated});
  } catch (error) {
    res.status(500).send(error);
  }
};

const editInformation = async (req, res) => {
  try {


  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  displayPage,
  editInformation,
};