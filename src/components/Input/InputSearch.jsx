import { useState } from "react";

import Input from "./Input";

import "./input.css";

import { IoSearchOutline } from "react-icons/io5";

function InputSearch({ className = "", data = [], ...rest }) {
  const [value, setValue] = useState("");
  const [showResults, setShowResults] = useState(false);

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }

  function handleItemClick(item) {
    console.log("Open Item :", item)
  }

  return (
    <div className={`search__container ${className}`}>
      <Input
        icon={<IoSearchOutline className="icon" />}
        type="search"
        value={value}
        onChange={handleChange}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        {...rest}
      />
      {showResults && (
        <ul>
          {data
            .filter(item => item.toLowerCase().includes(value.toLowerCase()))
            .map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)}>
                {item}
              </li>
            ))}
          {value &&
            data.filter(item =>
              item.toLowerCase().includes(value.toLowerCase())
            ).length === 0 && (
              <li style={{ fontStyle: "italic" }}>No matching results</li>
            )}
        </ul>
      )}
    </div>
  );
}

export default InputSearch;
