const pool = require("../config");
const { body, validationResult } = require("express-validator");
const e = require("express");

const Validator = (req, res, next) => {
  if (
    body("first_name").isLength({ min: 1, max: 50 }).isString() &&
    body("last_name").isLength({ min: 1, max: 50 }).isString()
  ) {
    next();
  } else {
    res.sendStatus(400);
  }
};

module.exports = Validator;
