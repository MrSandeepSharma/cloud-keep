import "./loader.css"

import loaderImg from "../../assets/loader-icon.svg"
import logoImg from "../../assets/logo-large.svg"

function LoadingScreen() {
    return (
        <div className="loadingscreen bg-clr-accent-600">
            <img className="icon" src={loaderImg} alt="loading.." />
            <img className="logo" src={logoImg} alt="cloud keep" />
        </div>
    )
}

export default LoadingScreen
