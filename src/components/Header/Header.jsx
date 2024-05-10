import { Link } from "react-router-dom"

import Logo from "../Logo"
import { Secondarybtn } from "../Button"

import "./header.css"

function Header({ className="", btnPath="", btnText="", ...rest }) {
  return (
    <header className={`header container ${className}`} {...rest}>
        <Link className="skip-main outline" path="#" onClick={() => window.location.replace("#main")}>Skip to main content</Link>
        <Link to="/" className="header__logo outline">
            <Logo />
        </Link>
        <Secondarybtn path={btnPath} text={btnText} />
     </header>
  )
}

export default Header
