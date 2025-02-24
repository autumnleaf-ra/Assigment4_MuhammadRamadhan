const Joi = require('joi');
const Boom = require('boom');

const helmetAddValidation = (data) => {
  const schema = Joi.object({
    type: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const helmetEditValidation = (data) => {
  const schema = Joi.object({
    price: Joi.number().required(),
    stock: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Username can only contain alphabetic characters.'
      }),
    password: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = { helmetAddValidation, helmetEditValidation, loginValidation };
