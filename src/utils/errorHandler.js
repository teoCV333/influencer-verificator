import { genericResponse } from "../utils/genericResponse.js";

export const errorHandler = (res, error) => {
  const errors = {
    ConnectionError: {
      status: 500,
      message: `ConnectionError: ${error.message}`,
    },
    ValidationError: {
      status: 422,
      message: `ValidationError: ${error.message}`,
    },
    NotFoundError: {
      status: 404,
      message: `NotFoundError: ${error.message}`,
    },
    AuthError: {
      status: 401,
      message: `AuthError: ${error.message}`,
    },
  };
  //error with status
  if (!errors[error.name]) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal error',
    });
  }
  res.status(errors[error.name].status).json({
    success: false,
    data: null,
    message: errors[error.name].message,
  });
};
