const createErrorFactory = function (name) {
  return class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = name;
    }
  };
};

export const ConnectionError = createErrorFactory("ConnectionError");
export const ValidationError = createErrorFactory("ValidationError");
export const DuplicateError = createErrorFactory("DuplicateError");
export const NotFoundError = createErrorFactory("NotFoundError");
export const AuthError = createErrorFactory("AuthError");
