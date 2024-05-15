

const displayPage = async (req, res) => {
    try {
        res.render('loginPage');
    } catch (error) {
        res.status(500).send(error);
    }
};

const authenticateUser = async (req, res) => {
    try {
        res.render('loginPage');
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    displayPage,
    authenticateUser,
};