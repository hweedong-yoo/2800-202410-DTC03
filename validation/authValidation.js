const { name } = require('ejs');
const Joi = require('joi');

const commonEmail = Joi.string().email().max(30).required();
const commonPassword = Joi.string().min(5).max(20).required();
const commonSecurityAnswer = Joi.string().max(20).required();

const emailSchema = Joi.object({
  email: commonEmail,
});

const securityAnswerSchema = Joi.object({
  answer: commonSecurityAnswer,
});

const passwordSchema = Joi.object({
  password: commonPassword,
});

const signUpSchema = Joi.object({
  name: commonSecurityAnswer,
  email: commonEmail,
  password: commonPassword,
});

module.exports = {
  emailSchema,
  securityAnswerSchema,
  passwordSchema,
  signUpSchema,
};
