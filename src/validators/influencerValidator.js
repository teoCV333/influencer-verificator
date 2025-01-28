import Joi from "joi";

export const addNewInfluencerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  contentCategories: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  quantityFollowers: Joi.number().positive().required(),
  claims: Joi.array()
    .items(
      Joi.object({
        claimText: Joi.string().required(),
        datePosted: Joi.string().isoDate().required(),
        postUrl: Joi.string().uri().required(),
        categories: Joi.array().items(Joi.string()).required(),
        verificationStatus: Joi.string()
          .valid("Verified", "Questionable", "Debunked")
          .required(),
        sources: Joi.array().items(Joi.string()).required(),
      })
    )
    .required(),
  score: Joi.number().min(0).max(200).required(),
});

export const getInfluencerByNameSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  filter: Joi.string().min(3).max(6).optional(),
  claimsNumber: Joi.string().optional(),
  token: Joi.string().required(),
});

export const searchNewInfluencerClaimsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  filter: Joi.string().min(3).max(6).optional(),
  claimsNumber: Joi.number().optional(),
  token: Joi.string().required(),
});
