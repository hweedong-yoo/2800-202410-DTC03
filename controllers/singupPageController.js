const userModel = require('../models/userModels');
const { signUpSchema } = require('../validation/authValidation');
const Joi = require("joi");
const bcrypt = require('bcrypt');


const expireTime = 60 * 60 * 1000

const displayPage = async (req, res) => {
    try {
        res.render('signupPage');
    } catch (error) {
        res.status(500).send(error);
    }
};

const addUser = async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    
	const validationResult = signUpSchema.validate({name, email, password})
    if (validationResult.error != null) {
       res.redirect(`/signup?missing=${validationResult.error.details[0].context.key}`);
       return;
   }

    var hashedPassword = bcrypt.hash(password, 8);
	
    const newUser = new userModel({
        name: name,
        email: name,
        password: hashedPassword,
    });

    await newUser.save();

    console.log("User added successfully");

        req.session.authenticated = true;
        req.session.name = user.name;
        req.session.email = user.email;
        req.session.cookie.maxAge = expireTime;
    return res.redirect('/home');
};

module.exports = {
    displayPage,
    addUser,
};