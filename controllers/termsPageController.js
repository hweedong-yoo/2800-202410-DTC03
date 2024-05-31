/**
 * Express controller function for displaying the terms page.
 * 
 * This module contains a function to handle the request to render the terms page.
 * 
 */

// Display the terms page
const displayPage = async (req, res) => {
  try {
      res.render('termsPage', {authenticated : req.session.authenticated});
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports = {
  displayPage,
};