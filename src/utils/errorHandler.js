export const errorHandler = (res, error) => {
  const errors = {
    AuthError: {
      status: 401,
      message: `AuthError: ${error.message}`,
    },
    NotFoundError: {
      status: 404,
      message: `NotFoundError: ${error.message}`,
    },
    DuplicateError: {
      status: 409,
      message: `DuplicateError: ${error.message}`,
    },
    ValidationError: {
      status: 422,
      message: `ValidationError: ${error.message}`,
    },
    ConnectionError: {
      status: 500,
      message: `ConnectionError: ${error.message}`,
    },
  };

  try {
    res.status(errors[error.name].status).json({
      success: false,
      data: null,
      message: errors[error.name].message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal error",
    });
  }
};
