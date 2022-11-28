import Joi from 'joi';

export const Schema = Joi.object({
  name: Joi.string()
    .min(3)
    .trim()
    .max(30)
    .regex(/^([^0-9]*)$/i)
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.base': 'Name must be a string',
      'string.empty': 'Name is not allowed to be empty',
      'string.min': 'Name must have a minimum of 3 letters',
      'string.max': 'Name can contain more than 30 letters',
      'string.pattern.base': 'Name must have a minimum of 3 letters',
      'string.required': 'Name field is required'
    }),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .regex(/^([^0-9]*)$/i)
    .required()
    .messages({
      'any.required': 'Last Name is required',
      'string.empty': 'Last Name is not allowed to be empty',
      'string.base': 'Last Name must be a string',
      'string.min': 'Last Name must have a minimum of 3 letters',
      'string.max': 'Last Name can contain more than 30 letters',
      'string.pattern.base': 'Last Name must have a minimum of 3 letters',
      'string.required': 'Last Name field is required'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': 'an email is required',
      'string.email': 'Insert a valid email',
      'string.empty': 'Email is not allowed to be empty',
      'string.required': 'email field is required'
    }),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .messages({
      'any.required': 'a password is required',
      'string.pattern.base':
        'Password must contain at least 8 characters, "one" capital letter, "one" lower case and "one" number at least',
      'string.required': 'Password field is required'
    })
});
