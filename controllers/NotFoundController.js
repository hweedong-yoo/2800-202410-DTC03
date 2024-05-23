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