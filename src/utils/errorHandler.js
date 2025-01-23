import { genericResponse } from "./genericResponse.js";

export const customHandleError = (res, error) => {
    console.error(error);
    result = {
        statusCode: error.status || 500,
        message: error.message || "Internal Error"
    }

    return genericResponse(res, result);
};