import { errorHandler } from "../utils/errorHandler.js";
import { ValidationError } from "../utils/errors.js";
import { addNewInfluencerSchema } from "../validators/influencerValidator.js";

export const validationsMiddleware = (req, res, next) => {
  try {
    if (req.params.id && req.params.id.length != 24) {
      throw new ValidationError("invalid id");
    }
    if (req.method === "POST") {
      const { error } = addNewInfluencerSchema.validate(req.body);
      if (error) throw new ValidationError(error.details[0].message);
    }
    next();
  } catch (error) {
    errorHandler(res, error);
  }
};
