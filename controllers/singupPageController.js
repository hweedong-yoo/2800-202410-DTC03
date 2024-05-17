const userModel = require('../models/userModels');
const { signUpSchema } = require('../validation/authValidation');
const Joi = require("joi");
const bcrypt = require('bcrypt');


const expireTime = 60 * 60 * 1000

const displayPage = async (req, res) => {
    try {
        res.render('signupPage', { authenticated: req.session.authenticated });
    } catch (error) {
        res.status(500).send(error);
    }
};

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const validationResult = signUpSchema.validate({ name, email, password });
    if (validationResult.error != null) {
        console.log(validationResult.error.details[0].context.key);
        res.redirect(`/signup?missing=${validationResult.error.details[0].context.key}`);
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        
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
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Error adding user");
    }
};


module.exports = {
    displayPage,
    addUser,
};