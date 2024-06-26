import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Footer, Header, Input, InputPassword, Loader, ToastMsg } from "../../components"
import { Primarybtn, Secondarybtn } from "../../components/Button"

import { validateForm } from "../../utils";
import authService from "../../firebase-local/auth"
import { login } from "../../store/authSlice";

import "./loginpage.css"

import { FaChevronLeft } from "react-icons/fa";

function Loginpage() {

  const [errMsg, setErrMsg] = useState([{email: "", password: ""}])
  const [showForgetPasswordSection, setShowForgetPasswordSection] = useState(false)
  const [showMsgSection, setShowMsgSection] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function loginUser(e) {
    e.preventDefault()

    // Get Form Data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")
    const password = formData.get("password")

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

    try {
      setLoading(true)
      const user = await authService.loginUserUsingEmail(email, password)
      const userData = {
          email: user.user.email,
          displayName: user.user.displayName,
          photoURL: user.user.photoURL,
          uid: user.user.uid
      }

      if(userData) {
        toast.success("User Login Successfully!")
        dispatch(login(userData))
        navigate("/")
        setLoading(false)
      }

    } catch (error) {
      toast.error("Please check your input again!")
      setLoading(false)
    }
  }

  function forgetPassword() {
    setShowForgetPasswordSection(true)
  }

  function resetPassword(e) {
    e.preventDefault();
    // Get Form Data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")

    // Form Validation
    const fields = [
      { name: "email", required: true }
    ];

    const errors = validateForm(formData, fields);
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors);
      return;
    }

    try {
      authService.forgotPassword(email)
      setShowMsgSection(true)
    } catch (error) {
      toast.error("Please check your email again!")
    }
  }

  function backToLoginPage() {
    setShowForgetPasswordSection(false)
    setShowMsgSection(false)
  }

  return (
    <>
      <Header className="bg-clr-accent-600" btnPath="/signup" btnText="Create New Account" />
      <main id="main" className="bg-clr-accent-600 container loginpage-wrapper">
        <ToastMsg />
        {
          loading ? <Loader /> : ""
        }
        <section className="loginpage">
          <h1 className="loginpage__title">Login Page</h1>
          <p className="loginpage__desc">
            Welcome to Cloud Keep, your seamless gateway to organized files and effortless collaboration
          </p>
          {
            showForgetPasswordSection
              ? (
                  showMsgSection 
                    ? (
                      <div className="forgetpass__container msg__section">
                        <h2 className="forgetpass__title">Reset Your Password</h2>
                        <p className="forgetpass__desc">
                        A password reset link has been sent to your registered email address. Please check your inbox 
                        (and also the spam folder, just in case) for an email from us. Click on the link 
                        provided in the email to reset your password and regain access to your account.
                        </p>
                        <Secondarybtn icon={<FaChevronLeft />} type="btn" text="back to Login Page" onClick={backToLoginPage} />
                      </div>
                    ) : (
                      <div className="forgetpass__container">
                        <Secondarybtn icon={<FaChevronLeft />} type="btn" text="back to Login Page" onClick={backToLoginPage} />
                        <h2 className="forgetpass__title">Reset Your Password</h2>
                        <form onSubmit={resetPassword}>
                            <Input errTxt={errMsg.email && errMsg.email} type="email" name="email" placeholder="Enter Your Email Here ...*" />
                            <Primarybtn type="submit" text="Send Verfication Link" />
                        </form>
                        <p className="forgetpass__desc">
                          We've got you covered. Enter your email address below, and we'll 
                          send you an email verfication link and after clicking on the link you can reset your password. Let's get you 
                          back on track!
                        </p>
                      </div>
                    )
                ) : (
                  <div className="loginpage__inner">
                      <form onSubmit={loginUser} className="signup__form">
                        <Input errTxt={errMsg.email && errMsg.email} type="email" name="email" placeholder="Enter Your Email Here ...*" />
                        <InputPassword errTxt={errMsg.password && errMsg.password} name="password" placeholder="Enter Your Password Here ...*" />
                        <Primarybtn type="submit" text="Login Now!" />
                      </form>
                      <Secondarybtn type="button" text="Forget Password" onClick={forgetPassword} />
                  </div>
                )
            }
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Loginpage