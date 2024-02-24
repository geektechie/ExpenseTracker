const { response } = require("../common/common");

const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 400;

    if (err.response) {
        console.log(err.response?.data);
        console.log(err.response?.status);
        console.log(err.response?.headers);
    } else if (err.request) {
        console.log(err.request);
    } else {
        console.log(err);
    }
    return res.status(status).json(response(false, null, err.message))
}

module.exports = errorMiddleware;