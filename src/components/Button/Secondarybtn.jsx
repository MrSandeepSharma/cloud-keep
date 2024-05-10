import Button from "./Button"

import "./buttons.css"

function Secondarybtn({ type="link", icon="", path="", text="", className="", ...rest }) {
    return (
      <Button type={type} icon={icon} path={path} text={text} className={`btn-secondary ${className}`} {...rest} />
    )
  }

export default Secondarybtn
