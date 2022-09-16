const Validate = (user, data) => {
  const errors = {};
  Object.keys(data.properties).map((key) => {
    const maxLength = data.properties[key].maxLength;
    const minLength = data.properties[key].minLength;
    const array = data.properties[key].enum;
    const title = data.properties[key].title;
    const type = data.properties[key].type;
    const format = data.properties[key].format;

    if (data.required.includes(key)) {
      if (maxLength && minLength) {
        if (!user[key]) {
          errors[key] = `${title} should not be empty`;
        } else if (user[key].length < minLength) {
          errors[key] = `${title} length should not be less than ${minLength}`;
        } else if (user[key].length > maxLength) {
          errors[
            key
          ] = `${title} length should not be greater than ${maxLength}`;
        }
      }
      if (array) {
        if (!user[key]) {
          errors[key] = `Choose ${title}`;
        }
      }
      if (type == "boolean") {
        if (array) {
          if (!user[key]) {
            errors[key] = `Choose ${title}`;
          }
        } else {
          if (!user[key]) {
            errors[key] = ` ${title} must be selected`;
          }
        }
      }
      if (format) {
        if (!user[key]) {
          errors[key] = ` ${title} must be selected`;
        }
      }
    }
  });
  return errors;
};
export default Validate;
