import { useContext } from "react";
import { UserContext } from "./Form";

function Input() {
  const { data, formError, handleChange, user, handleBoolean } =
    useContext(UserContext);

  function checkInput(key) {
    const type = data.properties[key].type;
    const format = data.properties[key].format;
    const array = data.properties[key].enum;
    if (format) {
      switch (format) {
        case "date":
          return (
            <>
              <input
                name={key}
                value={user[key] || ""}
                onChange={handleChange}
                type="date"
              />
            </>
          );

        case "date-time":
          return (
            <>
              <input
                name={key}
                value={user[key] || ""}
                onChange={handleChange}
                type="date-time-local"
              />
            </>
          );
      }
    }
    if (type == "boolean") {
      if (array) {
        return array.map((data, index) => {
          return (
            <div key={index}>
              <input
                name={key}
                value={data}
                onChange={handleChange}
                type="checkbox"
              />
              <label name={key}>{data}</label>
            </div>
          );
        });
      } else {
        return (
          <>
            <div>
              <input
                name={key}
                value={user[key] || ""}
                onChange={handleBoolean}
                type="checkbox"
              />
            </div>
          </>
        );
      }
    }

    if (type == "string") {
      if (array) {
        return (
          <select name={key} value={user[key]} onChange={handleChange}>
            <option value="">Choose</option>
            {array.map((data, index) => {
              return (
                <option value={data} key={index}>
                  {data}
                </option>
              );
            })}
          </select>
        );
      } else {
        return (
          <input
            name={key}
            value={user[key] || ""}
            onChange={handleChange}
            type="text"
          />
        );
      }
    }
    if (type == "integer" || type == "number") {
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
    return (
      <div key={index} className="input">
        <label className="label">{data.properties[key].title}</label>
        {checkInput(key)}
        <div className="err">{formError[key]}</div>
      </div>
    );
  });
  return <>{elements}</>;
}

export default Input;
