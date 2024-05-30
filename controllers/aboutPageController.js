/**
 * Express controller function for displaying the about page.
 * 
 * This module contains a function to handle the request to render the about page.
 * 
 */

// Display the about page
const displayPage = async (req, res) => {
  try {
      res.render('aboutPage', {authenticated : req.session.authenticated});
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
};