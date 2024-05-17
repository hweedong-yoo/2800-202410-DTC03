const displayPage = async (req, res) => {
    try {
        res.render('getEmail', {authenticated : req.session.authenicated});
    } catch (error) {
        res.status(400).send(error);
    }
};


module.exports = {
    displayPage,
};