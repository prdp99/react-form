import { useState, useEffect } from "react";
import formJson from "../Person.json";
import "../index.css";
import validate from "./Validate";
import React from "react";
import Input from "./Input";

export const UserContext = React.createContext();

function Form() {
  const [user, setUser] = useState({});
  const [data, setData] = useState(formJson);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  function handleChange(event) {
    const { name, value, type } = event.target;
    if (type == "checkbox") {
      if (!user[name]) {
        setUser((prev) => {
          return {
            ...prev,
            [name]: [value],
          };
        });
      } else if (!user[name].includes(value)) {
        setUser((prev) => {
          return {
            ...prev,
            [name]: [...prev[name], value],
          };
        });
      } else {
        setUser((prev) => {
          return {
            ...prev,
            [name]: prev[name].filter((data) => data !== value),
          };
        });
      }
    } else {
      setUser((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  function handleBoolean(event) {
    const { name, value } = event.target;
    if (!user[name]) {
      setUser((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
    } else {
      setUser((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setFormError(validate(user, data));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      //submit user data
    }
  }, [formError]);

  return (
    <>
      <UserContext.Provider
        value={{ data, formError, handleChange, user, handleBoolean }}
      >
        <form onSubmit={handleSubmit} className="login">
          <div className="success">
            {Object.keys(formError).length === 0 && isSubmit ? (
              <h2>Successfully Submitted</h2>
            ) : (
              ""
            )}
          </div>
          <div className="header">{data.title}</div>
          <Input />
          <button className="submit-btn">Submit</button>
        </form>
      </UserContext.Provider>
    </>
  );
}

export default Form;
