const Joi = require("joi");

const getInfluencerByNameSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    filter: Joi.string().min(3).max(6).optional(),
    token: Joi.string().required()
});

module.exports = { getInfluencerByNameSchema };