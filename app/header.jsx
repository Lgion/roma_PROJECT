"use client"

// import Headers,{HeadersDoubleSimple} from "./components/Headers"
import ClerkBtns from "./components/vendors/ClerkBtns"
import AuthButton from "./components/AuthButton";


export default (item,i) => <header className="app-header">
    {/* <button onClick={e => {e.target.classList.toggle("on")}}>SIGNIN/LOGIN</button> */}
    <AuthButton />
    <ClerkBtns />
</header>


