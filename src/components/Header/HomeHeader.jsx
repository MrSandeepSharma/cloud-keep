import { Link } from "react-router-dom"

import Logo from "../Logo"
import Profile from "../Profile"
import { InputSearch } from "../Input"

import "./header.css"

function HomeHeader({ className="", data=[], dataType="file", fileOpen=()=>{}, ...rest }) {
  return (
    <header className={`homeheader container ${className}`} {...rest}>
        <Link className="skip-main outline" path="#" onClick={() => window.location.replace("#main")}>Skip to main content</Link>
        <Link to="/" className="header__logo outline">
            <Logo />
        </Link>
        <InputSearch dataType={dataType} fileOpen={fileOpen} data={data} placeholder="Search in cloud keep" />
        <Profile />
    </header>
  )
}

export default HomeHeader
