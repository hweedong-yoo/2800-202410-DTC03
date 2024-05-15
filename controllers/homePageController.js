const displayPage = async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  displayPage,
};