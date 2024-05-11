import { useRef, useEffect } from "react";

function DetectOutsideClick({ children="", onClick=()=>{} }) {

    const newRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    function handleOutsideClick(e) {
        if (newRef.current && !newRef.current.contains(e.target)) {
            onClick()
        }
    }

  return (
    <div ref={newRef}>
      {children}
    </div>
  )
}

export default DetectOutsideClick
