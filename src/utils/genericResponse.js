function genericResponse(res, results) {
    const {data, statusCode, message} = results;
    response = {
        status: {
            code: statusCode,
            message,
        },
        data: data || {},
    };
    return res.status(statusCode).json(response);
}

module.exports = {genericResponse}