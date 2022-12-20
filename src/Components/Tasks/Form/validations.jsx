import Joi from 'joi';

const letterSpacesRegEx = /[A-Za-z]{3}([A-Za-z]+ ?)*/;
export const schema = Joi.object({
  description: Joi.string().min(3).max(300).regex(letterSpacesRegEx).required().messages({
    'any.required': 'Description is required',
    'string.empty': 'Description is not allowed to be empty',
    'string.min': 'Description must have a minimum of 3 characters',
    'string.max': 'Description can not be longer than 300 characters',
    'string.pattern.base': 'Description can only contain letters',
    'string.required': 'Description field is required'
  })
});
