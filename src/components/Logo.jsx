import logoImg from "../assets/logo.svg"
import logoLargeImg from "../assets/logo-large.svg"

function Logo() {
  return (
    <picture>
      <source media="(min-width: 600px)" srcSet={logoLargeImg} width="213.24" height="35" />
      <img src={logoImg} alt="Cloud Keep" width="35" height="35" />
    </picture>
  )
}

export default Logo