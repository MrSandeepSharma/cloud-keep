import { useSelector } from "react-redux"

import Landingpage from "./Landingpage"
import Homepage from "./Homepage"

function RouteController() {

  const authStatus = useSelector(state => state.auth.status)

  return authStatus ? <Homepage /> : <Landingpage />
}

export default RouteController;