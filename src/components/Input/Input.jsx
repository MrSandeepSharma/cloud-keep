import { useState } from "react";

import "./input.css"

function Input({ icon="", type="text", className="", errTxt="", ...rest }) {

    const [value, setValue] = useState("");

    const changeValue = (e) => setValue(e.target.value);

  return (
    <div className="input__container">
        {
            icon 
                ? (
                    <div className="inputIcon">
                        {icon}
                        <Input type={type} className={`input-field ${className} ${errTxt ? "error-field": ""}`} {...rest} />
                    </div>
                ) : (
                    <input type={type} className={`input-field ${className} ${errTxt ? "error-field": ""}`}  onChange={changeValue} value={value}  {...rest} />
                )
        }
        <p className="error-text">{errTxt}</p>
    </div>
  )
}

export default Input
