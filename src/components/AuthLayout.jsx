import { useSelector } from "react-redux"

import { Errorpage } from "../pages";

function AuthLayout({children}) {

  const authStatus = useSelector(state => state.auth.status)

  return authStatus ? <Errorpage /> : <>{children}</>
}

export default AuthLayout;