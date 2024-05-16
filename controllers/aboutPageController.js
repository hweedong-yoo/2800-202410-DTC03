const displayPage = async (req, res) => {
  try {
      res.render('aboutPage');
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
};