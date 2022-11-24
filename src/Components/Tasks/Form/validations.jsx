import Joi from 'joi';

const letterSpacesRegEx = /[A-Za-z]{3}([A-Za-z]+ ?)*/;
export const schema = Joi.object({
  description: Joi.string().min(3).max(300).required().regex(letterSpacesRegEx).messages({
    'any.required': 'Description is required',
    'string.base': 'Description must be a string',
    'string.empty': 'Description is not allowed to be empty',
    'string.min': 'Description must have a minimum of 3 letters',
    'string.max': 'Description can contain more than 300 letters',
    'string.pattern.base': 'Description must have a minimum of 3 letters',
    'string.required': 'Description field is required'
  })
});
