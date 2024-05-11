import { useSelector, useDispatch } from "react-redux"

import { Primarybtn } from "../../components/Button"
import { HomeHeader } from "../../components"

import authService from "../../firebase-local/auth"
import { logout } from "../../store/authSlice"

import "./homepage.css"

function Homepage() {
 
  const user = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()

  function logoutUser() {
    authService.logoutCurrentUser()
    dispatch(logout())
}

  return (
    <>
      <HomeHeader />
      <main id="main">
        <h1>{user ? user.displayName : ""}</h1>
        <h3>{user ? user.email : ""}</h3>
        <Primarybtn type="button" text="Logout User" onClick={logoutUser} />
      </main>
    </>
  )
}

export default Homepage