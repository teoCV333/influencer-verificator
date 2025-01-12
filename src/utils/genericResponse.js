function genericResponse(results) {
    const {data, statusCode, message} = results;
    return {
        status: {
            code: statusCode,
            message,
        },
        data: data || {},
    };
}

module.exports = {genericResponse}