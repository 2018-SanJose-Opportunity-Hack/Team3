const isEmpty = require("./is-empty.js");
const Validator = require('validator');



module.exports = (data) => {
  const errors = {};
  data.username = isEmpty(data.username) ? "" : data.username;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;
  if (!Validator.isLength(data.username, {
      min: 6,
      max: 20
    })) {
    errors.username = "Username must be 6 to 20 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username must not be empty"
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}