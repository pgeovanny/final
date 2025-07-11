import Joi from 'joi';

const envSchema = Joi.object({
  GEMINI_API_KEY: Joi.string().required(),
  GEMINI_MODEL: Joi.string().required(),
  GEMINI_ENDPOINT: Joi.string().uri().required(),
  PORT: Joi.number().default(3333)
}).unknown();

export function validateEnv() {
  const { error, value } = envSchema.validate(process.env);
  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }
}
