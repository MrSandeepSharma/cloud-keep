import "./loader.css"

import loaderGif from "../../assets/loader.gif"

function Loader() {
  return (
    <div className="loader">
      <img src={loaderGif} alt="loader" />
    </div>
  )
}

export default Loader
