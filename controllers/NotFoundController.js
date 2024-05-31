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
        res.status(500).send(error);
    }
};

module.exports = {
    displayPage,
};