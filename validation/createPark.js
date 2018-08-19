const isEmpty = require("./is-empty.js");
const Validator = require('validator');

module.exports = (data) => {
  const errors = {};
  console.log(data.name, data.openTimeMilliseconds, data.closeTimeMilliseconds);
  data.name = isEmpty(data.name) ? "" : data.name;
  if (!Validator.isLength(data.name, {
      min: 6,
      max: 40
    })) {
    errors.name = "Park Name must be 6 to 40 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Park Name must not be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}