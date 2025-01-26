import { errorHandler } from "../utils/errorHandler.js";
import { ValidationError } from "../utils/errors.js";

export const validationsMiddleware = (req, res, next) => {
  console.log(req.baseUrl);
  try {
    if (req.params.id && req.params.id.length < 24) {
      throw new ValidationError("invalid id");
    }
    console.log(req.method);
    console.log(req.params);
    console.log(req.headers["authorization"]);
    next();
  } catch (error) {
    errorHandler(res, error);
  }
};


