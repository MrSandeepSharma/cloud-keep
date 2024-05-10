import { Header } from "../../components"

import "./loginpage.css"

function Loginpage() {
  return (
    <>
      <Header className="bg-clr-accent-600" btnPath="/signup" btnText="Create New Account" />
      <main id="main">
        <h1>Login Page</h1>
      </main>
    </>
  )
}

export default Loginpage