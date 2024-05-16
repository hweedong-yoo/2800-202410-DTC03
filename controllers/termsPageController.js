const displayPage = async (req, res) => {
  try {
      res.render('termsPage');
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
};