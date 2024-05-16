const userModel = require('../models/userModels');
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
    
	const schema = Joi.object(
		{
            name: Joi.string().alphanum().max(20).required(),
			email: Joi.string().max(20).required(),
			password: Joi.string().max(20).required()
		});
	
	const validationResult = schema.validate({name, email, password})
    if (validationResult.error != null) {
       res.redirect(`/signup?missing=${validationResult.error.details[0].context.key}`);
       return;
   }

    var hashedPassword = await bcrypt.hashSync(password, 8);
	
    const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
    });

    await newUser.save();

    console.log("User added successfully");

        req.session.authenticated = true;
        req.session.name = name;
        req.session.email = email;
        req.session.cookie.maxAge = expireTime;
    return res.redirect('/home');
};

module.exports = {
    displayPage,
    addUser,
};