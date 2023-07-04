import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().max(191).required()
})

export default { create }