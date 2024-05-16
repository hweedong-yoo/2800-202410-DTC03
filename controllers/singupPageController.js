const userModel = require('../models/userModels');
const Joi = require("joi");
const bcrypt = require('bcrypt');

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
        email: name,
        password: hashedPassword,
    });

    await newUser.save();
    console.log("User added successfully");
    return res.redirect('/home');
};

module.exports = {
    displayPage,
    addUser,
};