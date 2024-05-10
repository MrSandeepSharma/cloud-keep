import { Primarybtn } from "../../components/Button"

import "./errorpage.css"

import iconImg from "../../assets/logo-large.svg"
import { FaChevronLeft } from "react-icons/fa";

function Errorpage() {
  return (
    <div className="errorpage flex-container">
      <img src={iconImg} alt="cloud keep" />
      <h1 className="errorpage__title">404</h1>
      <p className="errorpage__desc">
        Oops! The page you're looking for isn't here. Why not head back to our 
        homepage and explore from there?
      </p>
      <Primarybtn icon={<FaChevronLeft />} path="/" text="Go to Homepage" />
    </div>
  )
}

export default Errorpage