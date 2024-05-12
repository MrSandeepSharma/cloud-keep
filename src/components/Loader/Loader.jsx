import "./loader.css"

import loaderGif from "../../assets/loader.gif"

function Loader({ className="" }) {
  return (
    <div className={`loader ${className}`}>
      <img src={loaderGif} alt="loader" />
    </div>
  )
}

export default Loader
