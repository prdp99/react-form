import { useState } from "react";
import formJson from "./Person.json";
import "./index.css";
function App() {
  const [user, setUser] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  let arr = [];
  const objectArr = Object.keys(formJson.properties).map((key, index) => {
    arr.push(key);
  });

  function checkType(type, key) {
    formJson.required.map((data) => {
      if (data == key) {
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
          case "integer":
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
        case "number":
          return (
            <input
              name={key}
              value={user[key] || ""}
              onChange={handleChange}
              type="number"
            />
          );
        case "integer":
          return (
            <input
              name={key}
              value={user[key] || ""}
              onChange={handleChange}
              type="number"
            />
          );
      }
    });

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
      case "number":
        return (
          <input
            name={key}
            value={user[key] || ""}
            onChange={handleChange}
            type="number"
          />
        );
      case "integer":
        return (
          <input
            name={key}
            value={user[key] || ""}
            onChange={handleChange}
            type="number"
            maxLength="10"
            pattern="[0-9]{0,12}"
          />
        );
    }
  }

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

  const labels = arr.map((key, index) => {
    let select = [];
    if (formJson.properties[key].enum) {
      select.push(formJson.properties[key].enum);
    }
    let newArray = select.flat();
    return (
      <div key={index} className="input">
        <label>{formJson.properties[key].title}</label>

        {formJson.properties[key].enum ? (
          <select name={key} value={user[key] || ""} onChange={handleChange}>
            {newArray.map((data, i) => {
              return <option key={i}>{data}</option>;
            })}
          </select>
        ) : (
          checkType(formJson.properties[key].type, key)
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
            {labels}
            <button className="submit-btn">Submit</button>
            <div className="msg">{isSubmitted && <p>*Submitted</p>}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
