import Joi from 'joi';

const letterSpacesRegEx = /[A-Za-z]{3}([A-Za-z]+ ?)*/;
export const schema = Joi.object({
  name: Joi.string().min(3).max(50).regex(letterSpacesRegEx).required(),
  lastName: Joi.string().min(3).max(50).regex(letterSpacesRegEx).required(),
  phone: Joi.string()
    .length(10)
    .regex(/^[0-9]+$/)
    .required(),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required(),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
});
