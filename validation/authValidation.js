const Joi = require('joi');

const emailSchema = Joi.object({
  email: Joi.string().email().max(20).required(),
});

const securityAnswerSchema = Joi.object({
  answer: Joi.string().max(20).required(),
});

const passwordSchema = Joi.object({
  password: Joi.string().max(20).required(),
});

const signUpSchema = Joi.object(
  {
    name: securityAnswerSchema,
    email: emailSchema,
    password: passwordSchema,
});


module.exports = {
  emailSchema,
  securityAnswerSchema,
  passwordSchema,
  signUpSchema,
};
