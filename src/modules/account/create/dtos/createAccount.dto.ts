import Joi from "joi";

const createAccountSchema = Joi.object({
  username: Joi.string().strip().max(50).required(),
  password: Joi.string().strip().max(100).required(),
  bio: Joi.string().strip().max(500).required(),
  phone: Joi.string().strip().max(11).required(),
});

export { createAccountSchema };
