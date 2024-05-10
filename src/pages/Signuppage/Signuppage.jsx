import { Footer, Header } from "../../components"

import "./signuppage.css"

function Signuppage() {
  return (
    <>
      <Header className="bg-clr-accent-600" btnPath="/login" btnText="Already have an Account" />
      <main id="main">
        <h1>Signup Page</h1>
      </main>
      <Footer />
    </>
  )
}

export default Signuppage