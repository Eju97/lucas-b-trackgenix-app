import Joi from 'joi';

export const employeeValidation = Joi.object({
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
      'string.pattern.base': 'Name can only contain letters',
      'string.required': 'Name field is required'
    }),
  lastName: Joi.string()
    .min(3)
    .trim()
    .max(30)
    .regex(/^([^0-9]*)$/i)
    .required()
    .messages({
      'any.required': 'Last Name is required',
      'string.empty': 'Last Name is not allowed to be empty',
      'string.base': 'Last Name must be a string',
      'string.min': 'Last Name must have a minimum of 3 letters',
      'string.max': 'Last Name can contain more than 30 letters',
      'string.pattern.base': 'Name can only contain letters',
      'string.required': 'Last Name field is required'
    }),
  phone: Joi.string()
    .length(10)
    .regex(/^[0-9]+$/)
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number is not allowed to be empty',
      'string.base': 'Phone number can only contain numbers',
      'string.length': 'Phone number must be 10 characters long',
      'string.pattern.base': 'Phone number can only contain numbers',
      'string.required': 'Phone number field is required'
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
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password field is not allowed to be empty',
      'string.pattern.base':
        'Password must contain at least 8 characters, "one" capital letter, "one" lower case and "one" number.',
      'string.required': 'Password field is required'
    })
});

export const employeeValidationEdit = Joi.object({
  name: Joi.string()
    .min(3)
    .trim()
    .max(30)
    .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is not allowed to be empty',
      'string.base': 'Name can only contain letters',
      'string.min': 'Name must have a minimum of 3 letters',
      'string.max': 'Name can not be longer than 30 letters',
      'string.pattern.base': 'Name can only contain letters',
      'string.required': 'Name field is required'
    }),
  lastName: Joi.string()
    .min(3)
    .trim()
    .max(30)
    .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
    .required()
    .messages({
      'any.required': 'Last Name is required',
      'string.empty': 'Last Name is not allowed to be empty',
      'string.base': 'Last Name can only contain letters',
      'string.min': 'Last Name must have a minimum of 3 letters',
      'string.max': 'Last Name can not be longer than 30 letters',
      'string.pattern.base': 'Last Name can only contain letters',
      'string.required': 'Last Name field is required'
    }),
  phone: Joi.string()
    .length(10)
    .regex(/^[0-9]+$/)
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number is not allowed to be empty',
      'string.base': 'Phone number can only contain numbers',
      'string.length': 'Phone number must be 10 characters long',
      'string.pattern.base': 'Phone number can only contain numbers',
      'string.required': 'Phone number field is required'
    })
});
