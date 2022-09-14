import { useState } from "react";
import formJson from "../Person.json";
import "../index.css";
function Form() {
  const [user, setUser] = useState({});
  const [data, setData] = useState(formJson);

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
      select = data.properties[key].enum;
    }
    return (
      <div key={index} className="input">
        <label className="label">{data.properties[key].title}</label>
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
      <form onSubmit={handleSubmit} className="login">
        <div className="header">{data.title}</div>
        {elements}
        <button className="submit-btn">Submit</button>
        <div className="msg"></div>
      </form>
    </>
  );
}

export default Form;
