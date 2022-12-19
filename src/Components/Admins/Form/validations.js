import Joi from 'joi';

export const Schema = Joi.object({
  name: Joi.string()
    .min(3)
    .trim()
    .max(30)
    .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is not allowed to be empty',
      'string.base': 'Name must be a string',
      'string.min': 'Name must have a minimum of 3 letters',
      'string.max': 'Name can contain more than 30 letters',
      'string.pattern.base': 'Name can only contain letters',
      'string.required': 'Name field is required'
    }),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
    .required()
    .messages({
      'any.required': 'Last Name is required',
      'string.empty': 'Last Name is not allowed to be empty',
      'string.base': 'Last Name must be a string',
      'string.min': 'Last Name must have a minimum of 3 letters',
      'string.max': 'Last Name can contain more than 30 letters',
      'string.pattern.base': 'Last Name can only contain letters',
      'string.required': 'Last Name field is required'
    }),
  email: Joi.string().email().required().messages({
    'any.required': 'An email is required',
    'string.email': 'Insert a valid email',
    'string.empty': 'Email is not allowed to be empty',
    'string.required': 'Email field is required'
  }),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password field is not allowed to be empty',
      'string.min': 'Pasword length must have a minimum of 8 characters',
      'string.pattern.base': 'Password must have at least 1 upper case, 1 lower case and 1 digit',
      'string.required': 'Password field is required'
    })
});
