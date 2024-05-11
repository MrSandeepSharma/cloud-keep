import DetectOutSideClick from "../DetectOutsideClick"
import { Primarybtn, Secondarybtn } from "../Button"

import "./popup.css"

function Popup({
    children="", 
    text="", 
    closeFunc=()=>{}, 
    onSubmit=(e) => {e.preventDefault()}, 
    ...rest
}) {
  return (
    <DetectOutSideClick onClick={closeFunc}>
        <form onSubmit={onSubmit} className="popup" {...rest}>
            {children}
            <div className="btn-container">
                <Secondarybtn type="button" text="Cancel" onClick={closeFunc} />
                <Primarybtn type="submit" text={text} />
            </div>
        </form>
    </DetectOutSideClick>
  )
}

export default Popup