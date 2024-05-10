import { Header } from "../../components"

import "./landingpage.css"

function Landingpage() {
  return (
    <>
      <Header className="bg-clr-accent-600" btnPath="/signup" btnText="Get Started" />
      <main id="main">
        <h1>Landing Page</h1>
      </main>
    </>
  )
}

export default Landingpage