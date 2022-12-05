import Joi from 'joi';

export const loginValidation = Joi.object({
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
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password field is not allowed to be empty',
      'string.pattern.base':
        'Password must contain at least 5 characters, "one" capital letter, "one" lower case and "one" number.',
      'string.required': 'Password field is required'
    })
});
