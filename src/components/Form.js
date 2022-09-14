import { useState, useEffect } from "react";
import formJson from "../Person.json";
import "../index.css";

function Form() {
  const [user, setUser] = useState({});
  const [data, setData] = useState(formJson);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setFormError(validate(user));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      //submit
    }
  }, [formError]);

  const validate = (user) => {
    const errors = {};
    let maxLength;
    let minLength;
    let userLength;
    Object.keys(data.properties).map((key) => {
      maxLength = data.properties[key].maxLength;
      minLength = data.properties[key].minLength;

      if (maxLength && minLength) {
        userLength = user[key].length;
        if (userLength == "") {
          errors[key] = `${data.properties[key].title} should not be empty`;
        } else if (userLength < minLength) {
          errors[
            key
          ] = `${data.properties[key].title} length should not be less than ${minLength}`;
        } else if (userLength > maxLength) {
          errors[
            key
          ] = `${data.properties[key].title} length should not be greater than ${maxLength}`;
        }
      }
      if (data.properties[key].enum) {
        if (user[key] == "") {
          errors[key] = `choose ${data.properties[key].title}`;
        }
      }
    });
    return errors;
  };

  function checkInput(type, key) {
    switch (type) {
      case "string":
        return (
          <input
            name={key}
            value={user[key] || ""}
            onChange={handleChange}
            type="text"
          />
        );
      case "integer":
      case "number":
        return (
          <input
            name={key}
            value={user[key] || ""}
            onChange={handleChange}
            type="number"
          />
        );
    }
  }

  const elements = Object.keys(data.properties).map((key, index) => {
    let select = [];
    if (data.properties[key].enum) {
      select = data.properties[key].enum;
    }
    return (
      <div key={index} className="input">
        <label className="label">{data.properties[key].title}</label>

        {data.properties[key].enum ? (
          <select name={key} value={user[key]} onChange={handleChange}>
            <option value="">Choose</option>
            {select.map((data, i) => {
              return (
                <option value={data} key={i}>
                  {data}
                </option>
              );
            })}
          </select>
        ) : (
          checkInput(data.properties[key].type, key)
        )}
        <div className="err">{formError[key]}</div>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="login">
        <div className="success">
          {Object.keys(formError).length === 0 && isSubmit ? (
            <h2>Successfully Submitted</h2>
          ) : (
            ""
          )}
        </div>
        <div className="header">{data.title}</div>
        {elements}
        <button className="submit-btn">Submit</button>
      </form>
    </>
  );
}

export default Form;
