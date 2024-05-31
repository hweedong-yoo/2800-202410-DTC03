/**
 * Express controller function for displaying the contact page.
 * 
 * This module contains a function to handle the request to render the contact page.
 * 
 */

// Display the contact page
const displayPage = async (req, res) => {
    try {
        res.render('contactPage', {authenticated : req.session.authenticated});
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    displayPage,
};