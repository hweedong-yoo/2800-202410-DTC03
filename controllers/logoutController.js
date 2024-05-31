/**
 * Express controller function for logging out a user.
 * 
 * This module contains a function to handle the request to destroy the user session and redirect to the login page.
 * 
 */

// Log out a user
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/login');
  } catch (error) {
    console.log('Error logging out:', error);
    res.status(500).render('home', { authenticated: req.session.authenticated });
  }
};

module.exports = {
  logout,
};