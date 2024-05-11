import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import DetectOutsideClick from "../DetectOutsideClick"
import { Secondarybtn } from "../Button"
import { colorCombinations } from "../../data"
import { logout } from "../../store/authSlice"
import authService from "../../firebase-local/auth"

import "./profile.css"

import { IoIosLogOut } from "react-icons/io";

function Profile({ className="", ...rest}) {

    const user = useSelector(state => state.auth.userData)

    const [isOpen, setIsOpen] = useState(true)
    const [styles, setStyles] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 5);

        setStyles(
            {
                backgroundColor: colorCombinations[randomNumber].background,
                color: colorCombinations[randomNumber].text
            }
        )
    }, [])

    function toggle() {
        setIsOpen(prev => !prev)
    }

    function logoutUser() {
        authService.logoutCurrentUser()
        dispatch(logout())
    }

  return (
    <DetectOutsideClick onClick={()=>{setIsOpen(true)}}>
        {
            user ? (
                <div className="profile">
                    <button 
                        id="profle-btn" 
                        className={`profile__btn outline ${className}`} 
                        aria-expanded={!isOpen} 
                        aria-controls="menu" 
                        onClick={toggle} 
                        {...rest}
                    >
                        {
                            user.photoURL 
                            ? <div className="image"><img src={user.photoURL} alt="" width="35" height="35" /></div>
                            : <div className="image" style={styles}><span>{user.displayName ? user.displayName[0].toUpperCase() : "G"}</span></div>
                        }
                    </button>
                    <div id="menu" className="profile__menu">
                        <p> {user.displayName ? user.displayName : "Ghost Account"} </p>
                        <Secondarybtn type="button" text="Logout" icon={<IoIosLogOut />} onClick={logoutUser} />
                    </div>
                </div>
            ) : ""}
    </DetectOutsideClick>
  )
}

export default Profile
