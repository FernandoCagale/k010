import Joi from 'joi';

const schema = {
  id: Joi
    .string()
    .alphanum()
    .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id'),
  nome: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  email: Joi
    .string()
    .email(),
  amigo: Joi
    .string()
    .min(1)
    .max(120)
    .trim()
};

export function getSchema () {
  return schema;
}
