const { response } = require("../common/common");

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req).array();
  console.log("🚀 ~ validate ~ errors:", errors)
  if (errors.length)
    return res.status(400).json(response(false, null, errors[0]["msg"]));
  next();
};

module.exports = validate;
