const displayPage = async (req, res) => {
    try {
        res.render('securityQuestion');
    } catch (error) {
        res.status(400).send(error);
    }
};

const submitQuestion = async(req, res) => {

}

module.exports = {
    displayPage,
    submitQuestion,
};