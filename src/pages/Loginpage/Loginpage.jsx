import { useState } from "react";

import { Footer, Header, Input, InputPassword } from "../../components"
import { Primarybtn, Secondarybtn } from "../../components/Button"

import { validateForm } from "../../utils";

import "./loginpage.css"

function Loginpage() {

  const [errMsg, setErrMsg] = useState([{email: "", password: ""}])

  function loginUser(e) {
    e.preventDefault()

    // Get Form Data
    const formData = new FormData(e.currentTarget);

    // Form Validation
    const fields = [
      { name: "email", required: true },
      { name: "password", required: true, minLength: 6 }
    ];

    const errors = validateForm(formData, fields);
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors);
      return;
    }

    console.log("User Login Success")
  }

  function forgetPassword() {
    console.log("Forget Password")
  }

  return (
    <>
      <Header className="bg-clr-accent-600" btnPath="/signup" btnText="Create New Account" />
      <main id="main" className="bg-clr-accent-600 container loginpage-wrapper">
        <section className="loginpage">
          <h1 className="loginpage__title">Login Page</h1>
          <p className="loginpage__desc">
            Welcome to Cloud Keep, your seamless gateway to organized files and effortless collaboration
          </p>
          <div className="loginpage__inner">
              <form onSubmit={loginUser} className="signup__form">
                <Input errTxt={errMsg.email && errMsg.email} type="email" name="email" placeholder="Enter Your Email Here ...*" />
                <InputPassword errTxt={errMsg.password && errMsg.password} name="password" placeholder="Enter Your Password Here ...*" />
                <Primarybtn type="submit" text="Login Now!" />
              </form>
              <Secondarybtn type="button" text="Forget Password" onClick={forgetPassword} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Loginpage