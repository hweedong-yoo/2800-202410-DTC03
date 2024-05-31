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
    console.log('Error rendering terms page:', error);
    res.status(500).render('termsPage', {authenticated : req.session.authenticated})
  }
};

module.exports = {
  displayPage,
};