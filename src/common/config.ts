import dotenv from 'dotenv';
import Joi from 'joi';
dotenv.config();


const envSchema = Joi.object().keys({
    NODE_ENV : Joi.string().valid('development','production','test').required(),
    PORT : Joi.number().default(3000),
SMTP_HOST : Joi.string().required(),
SMTP_PORT : Joi.string().required(),
SMTP_USER : Joi.string().required(),
SMTP_PASS : Joi.string().required(),
}).unknown();

const { value : envVars, error} = envSchema.validate(process.env);

if(error){
    throw new Error(`Config validation Error : ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      user: envVars.SMTP_USER,
      pass: envVars.SMTP_PASS,
    },
  };