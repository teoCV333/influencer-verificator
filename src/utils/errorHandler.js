const { genericResponse } = require("./genericResponse");

const customHandleError = (res, error) => {
    result = {
        statusCode: error.status || 500,
        message: error.message || "Internal Error"
    }

    return genericResponse(res, result);
};

module.exports = { customHandleError }