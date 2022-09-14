import React, { useState } from "react";
import formJson from "../Person.json";
import "../index.css";
function Form() {
  const [user, setUser] = useState({});
  const [data, setData] = useState(formJson);
  const [isSubmitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
    //Submitted
  }

  function checkInput(type, key) {
    switch (type) {
      case "string":
        return (
          <input
            name={key}
            value={user[key] || ""}
            onChange={handleChange}
            type="text"
            required
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
            required
          />
        );
    }
  }

  const elements = Object.keys(data.properties).map((key, index) => {
    let select = [];
    if (data.properties[key].enum) {
      select.push(data.properties[key].enum);
    }
    select = select.flat();
    return (
      <div key={index} className="input">
        <label>{data.properties[key].title}</label>
        {data.properties[key].enum ? (
          <select name={key} value={user[key] || ""} onChange={handleChange}>
            {select.map((data, i) => {
              return <option key={i}>{data}</option>;
            })}
          </select>
        ) : (
          checkInput(data.properties[key].type, key)
        )}
      </div>
    );
  });

  return (
    <>
      <div className="container">
        <div className="login">
          <div className="header">{formJson.title}</div>
          <form onSubmit={handleSubmit}>
            {elements}
            <button className="submit-btn">Submit</button>
            <div className="msg">{isSubmitted && <p>*Submitted</p>}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
