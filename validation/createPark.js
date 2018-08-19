const isEmpty = require("./is-empty.js");
const Validator = require('validator');

module.exports = (data) => {
  const errors = {};
  console.log(data.name, data.openTimeMilliseconds, data.closeTimeMilliseconds);
  data.name = isEmpty(data.name) ? "" : data.name;
  data.openTimeMilliseconds = isEmpty(data.openTimeMilliseconds) ? "" : data.openTimeMilliseconds;
  data.closeTimeMilliseconds = isEmpty(data.closeTimeMilliseconds) ? "" : data.closeTimeMilliseconds;
  if (!Validator.isLength(data.name, {
      min: 6,
      max: 20
    })) {
    errors.name = "Park Name must be 6 to 20 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Park Name must not be empty";
  }
  if (!Validator.isInt(data.openTimeMilliseconds)) {
    errors.openTimeMilliseconds = "Start time must be number";
  }
  if (Validator.isEmpty(data.openTimeMilliseconds)) {
    errors.openTimeMilliseconds = "Start time cannot be empty";
  }
  if (!Validator.isInt(data.closeTimeMilliseconds)) {
    errors.closeTimeMilliseconds = "Start time must be number";
  }
  if (Validator.isEmpty(data.closeTimeMilliseconds)) {
    errors.closeTimeMilliseconds = "Start time cannot be empty";
  }
  if (!errors.openTimeMilliseconds && !errors.closeTimeMilliseconds) {
    if (parseInt(data.openTimeMilliseconds) % 3600000 !== 0 || parseInt(data.closeTimeMilliseconds) % 3600000 !== 0) {
      errors.difference = 'Only hourly intervals can be submitted';

    } else if (parseInt(data.closeTimeMilliseconds <= parseInt(data.openTimeMilliseconds))) {
      errors.difference = 'End must be greater than start';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}