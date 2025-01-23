import Joi from "joi";

export const getInfluencerByNameSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    filter: Joi.string().min(3).max(6).optional(),
    claimsNumber: Joi.string().optional(),
    token: Joi.string().required()
});

export const searchNewInfluencerClaimsSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    filter: Joi.string().min(3).max(6).optional(),
    claimsNumber: Joi.number().optional(),
    token: Joi.string().required()
});

