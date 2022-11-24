import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .regex(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.empty': 'Name is not allowed to be empty',
      'string.min': 'Name must have a minimum of 3 letters',
      'string.max': 'Name not can contain more than 50 letters',
      'string.required': 'Name field is required',
      'string.pattern.base': 'Name can only contain letters'
    }),
  description: Joi.string().min(5).max(3000).required().messages({
    'string.empty': 'Description is not allowed to be empty',
    'string.min': 'Description must have a minimum of 3 letters',
    'string.max': 'Description not can contain more than 300 letters',
    'string.required': 'Description field is required'
  }),
  startDate: Joi.date().iso().required().messages({
    'data.empty': 'Start Date is not allowed to be empty',
    'date.format': 'Start Date must follow the pattern DD-MM-AAAA',
    'date.required': 'Start Date is required'
  }),
  endDate: Joi.date().iso().messages({
    'data.empty': 'End Date is not allowed to be empty',
    'date.format': 'End Date must follow the pattern DD-MM-AAAA',
    'date.required': 'End Date is required'
  }),
  clientName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.empty': 'Client Name is not allowed to be empty',
      'string.min': 'Client Name must have a minimum of 3 letters',
      'string.max': 'Client Name not can contain more than 50 letters',
      'string.required': 'Client Name field is required',
      'string.pattern.base': 'Client Name can only contain letters'
    }),
  employees: Joi.array().required()
});
