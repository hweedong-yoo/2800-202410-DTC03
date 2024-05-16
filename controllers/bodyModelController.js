const displayPage = async (req, res) => {
  try {
      res.render('bodyModel');
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
};