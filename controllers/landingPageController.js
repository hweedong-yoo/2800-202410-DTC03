const displayPage = async (req, res) => {
    try {
        res.render('landingPage', {authenicated : req.session.authenicated});
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    displayPage,
};