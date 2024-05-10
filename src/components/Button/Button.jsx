import { Link } from "react-router-dom"

function Button({ type="link", icon="", path="", text="", className="", ...rest }) {
  return (
    type === "link" 
        ? <Link className={`flex-container outline ${className}`} to={path} {...rest}>
            {icon}
            {text}
        </Link> 
        : <button className={`flex-container outline ${className}`} {...rest}>
            {icon}
            {text}
        </button>
  )
}

export default Button