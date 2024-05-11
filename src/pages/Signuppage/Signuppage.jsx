import { useState } from "react";

import { Footer, Header, Input, InputPassword } from "../../components"
import { Primarybtn, Secondarybtn } from "../../components/Button"

import { validateForm } from "../../utils";

import "./signuppage.css"

import { FaGoogle, FaChevronLeft } from "react-icons/fa";
import { SiGhostery } from "react-icons/si";

function Signuppage() {

  const [showOtp, setShowOtp] = useState(false)
  const [OTP, setOTP] = useState("")
  const [errMsg, setErrMsg] = useState([{username: "", email: "", password: "", otp: ""}])

  function sendOTP(e) {
    e.preventDefault()
    // Get Form Data
    const formData = new FormData(e.currentTarget);
    const fields = [
      { name: "username", required: true },
      { name: "email", required: true },
      { name: "password", required: true, minLength: 6 }
    ];

    // Validate Form
    const errors = validateForm(formData, fields);
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors);
      return;
    }

    setShowOtp(true)
    setOTP("456789")
    console.log("OTP Sent")
  }

  function submitOTP(e) {
    e.preventDefault()
    // Get Form Data
    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp");

    const fields = [
      { name: "otp", required: true, minLength: 4,  }
    ];

    // Validate Form
    const errors = validateForm(formData, fields);
    const otpError = otp != OTP ? 'The OTP you entered is incorrect. Please try again.' : ""

    if (otpError) {
      errors.otp = otpError;
    }

    if (Object.keys(errors).length > 0) {
      setErrMsg(errors);
      return;
    }
    
    console.log("OTP Submitted")
  }

  function resendOTP() {
    console.log("OTP Resend")
  }

  function loginWithGoogle() {
    console.log("Login Succesful!")
  }

  function loginAsGhost() {
    console.log("Login Succesful!")
  }

  return (
    <>
      <Header className="bg-clr-accent-600" btnPath="/login" btnText="Already have an Account" />
      <main id="main" className="bg-clr-accent-600 container signuppage-wrapper">
        <section className="signuppage">
          <h1 className="signuppage__title">Signup</h1>
          <p className="signuppage__desc">
            sign up today and take control of your files like never before!
          </p>
          {
            showOtp
            ? (
              <div className="otppage__container">
                <Secondarybtn icon={<FaChevronLeft />} type="btn" text="back to Signup" onClick={()=> {setShowOtp(false)}} />
                <h2 className="otppage__title">OTP</h2>
                <form onSubmit={submitOTP}>
                  <Input errTxt={errMsg.otp && errMsg.otp} type="number" name="otp" placeholder="Enter Your 6 digit OTP here ...*" />
                  <div className="flex-container btn-container">
                    <Primarybtn type="submit" text="Submit OTP" />
                    <Secondarybtn type="button" text="Resend OTP" onClick={resendOTP} />
                  </div>
                </form>
                <p className="otppage__desc">A One-Time Password (OTP) has been sent to your registered email address. Please check your inbox (and also the spam folder, just in case) for an email from us</p>
              </div>
            ) : (
              <div className="signuppage__inner">
                <form onSubmit={sendOTP} className="signup__form">
                  <Input errTxt={errMsg.username && errMsg.username} type="text" name="username" placeholder="Enter Your Name Here ...*" />
                  <Input errTxt={errMsg.email && errMsg.email} type="email" name="email" placeholder="Enter Your Email Here ...*" />
                  <InputPassword errTxt={errMsg.password && errMsg.password} name="password" placeholder="Enter Your Password Here ...*" />
                  <Primarybtn type="submit" text="Sign up" />
                </form>
                <div className="flex-container btn-container">
                  <Secondarybtn type="button" text="Login using Google" icon={<FaGoogle />} onClick={loginWithGoogle} />
                  <Secondarybtn type="button" text="Login as Ghost" icon={<SiGhostery />} onClick={loginAsGhost} />
                </div>
              </div>
            )
          }
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Signuppage