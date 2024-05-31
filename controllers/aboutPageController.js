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
      console.log('Error rendering about page:', error);
      res.status(500).render('home', {authenticated : req.session.authenticated});
  }
};

module.exports = {
  displayPage,
};