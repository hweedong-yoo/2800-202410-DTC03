/**
 * Express controller function for displaying the 404 error page.
 * 
 * This module contains a function to handle the request to render the 404 error page.
 * 
 */

// Display the 404 error page
const displayPage = async (req, res) => {
    console.log('404 page');
    try {
        res.render('404', {authenticated : req.session.authenticated});
    } catch (error) {
        console.log('Error rendering 404 page:', error);
        res.status(500).send('home', {authenticated : req.session.authenticated})
    }
};

module.exports = {
    displayPage,
};