import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
});
