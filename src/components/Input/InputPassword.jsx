import { useState } from "react"

import Input from "./Input"

import "./input.css"

function InputPassword({ icon="", className="", errTxt="", ...rest }) {

    const [showPassword, setShowPassword] = useState(false)

    function toggle() {
        setShowPassword(!showPassword)
    }

  return (
    <div className="password__container">
        <Input type={showPassword ? "text" : "password"} icon={icon} className={className} errTxt={errTxt} {...rest} />
        <button type="button" className="password__btn" onClick={toggle}>
            {
                showPassword ? "Hide" : "Show"
            }
        </button>
    </div>
  )
}

export default InputPassword
