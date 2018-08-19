const isEmpty = require("./is-empty.js");
const Validator = require('validator');

module.exports = (data) => {
  const errors = {};
  data.username = isEmpty(data.username) ? "" : data.username;
  data.password = isEmpty(data.password) ? "" : data.password;
  if (!Validator.isLength(data.username, {
      min: 6,
      max: 20
    })) {
    errors.username = "Username must be 6 to 20 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username must not be empty";
  }
  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    errors.password = "Password must be 6 to 30 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

