const displayPage = async (req, res) => {
    try {
        res.render('bloodPage', {authenticated : req.session.authenticated});
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    displayPage,
};