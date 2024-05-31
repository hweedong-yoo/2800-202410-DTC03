/**
 * Express controller function for displaying the landing page.
 * 
 * This module contains a function to handle the request to render the landing page.
 * 
 */

// Display the landing page
const displayPage = async (req, res) => {
    try {
        res.render('landingPage', {authenticated : req.session.authenticated});
    } catch (error) {
        console.log('Error rendering landing page:', error)
        res.status(500).send(error);
    }
};

module.exports = {
    displayPage,
};