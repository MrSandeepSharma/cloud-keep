import { Link } from "react-router-dom"

import Logo from "../Logo"

import "./footer.css"

import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

function Footer({ className="", ...rest}) {
  return (
    <footer className={`footer container ${className}`} {...rest}>
        <Link to="/" className="footer__logo outline">
            <Logo />
        </Link>
        <ul className="footer__social flex-container">
            <li className="social__item">
                <Link className="outline" to="https://github.com/MrSandeepSharma" aria-label="Github">
                    <FiGithub />
                </Link>
            </li>
            <li className="social__item">
                <Link className="outline" to="https://www.linkedin.com/in/sandipsharma2445/" aria-label="linkedin">
                    <FaLinkedinIn />
                </Link>
            </li>
        </ul>
    </footer>
  )
}

export default Footer
