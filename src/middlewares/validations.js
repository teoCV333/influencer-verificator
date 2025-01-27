import { errorHandler } from "../utils/errorHandler.js";
import { ValidationError } from "../utils/errors.js";

export const validationsMiddleware = (req, res, next) => {
  try {
    if (req.params.id && req.params.id.length < 24) {
      throw new ValidationError("invalid id");
    }
    next();
  } catch (error) {
    errorHandler(res, error);
  }
};
