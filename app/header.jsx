"use client"

// import Headers,{HeadersDoubleSimple} from "./components/Headers"
import ClerkBtns from "./components/vendors/ClerkBtns"


export default (item,i) => <header>
    <button onClick={e => {e.target.classList.toggle("on")}}>SIGNIN/LOGIN</button>
    <ClerkBtns />
</header>


