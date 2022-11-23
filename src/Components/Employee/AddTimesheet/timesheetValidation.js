import Joi from 'joi';

export const schema = Joi.object({
  description: Joi.string().min(3).trim().max(300).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is not allowed to be empty',
    'string.trim': 'Description is not allowed to be empty',
    'string.min': 'Description must have at least 3 characters',
    'string.max': 'Description can not bet longer than 300 characters',
    'string.required': 'Description is required',
    'any.required': 'Description is required'
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'Date is required',
    'date.format': 'Date must be a valid format'
  }),
  hours: Joi.number().positive().required().messages({
    'number.base': 'Hours  is required',
    'number.positive': 'Hours must be positive'
  }),
  task: Joi.string().length(24).required().messages({
    'string.empty': 'Task is required',
    'string.legth': 'Task does not exist'
  }),
  project: Joi.string().length(24).required().messages({
    'string.empty': 'Project is required',
    'string.legth': 'Project does not exist'
  })
});
