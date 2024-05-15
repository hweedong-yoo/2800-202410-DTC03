

const displayPage = async (req, res) => {
    try {
        res.render('loginPage');
    } catch (error) {
        res.status(500).send(error);
    }
};

const authenticateUser = async (req, res) => {
    try {
        const email = req.body.email; // Corrected to access 'email' field
        const password = req.body.password; // Corrected to access 'password' field

        // authentication logic here
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    displayPage,
    authenticateUser,
};