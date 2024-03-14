import React, { useState } from 'react'
import Logo from '../assets/logoAuth.png'
import Login from '../fragments/Login'
import SignUp from '../fragments/SignUp'

const Auth = () => {

  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className='auth' style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="auth-container">
          <img src={Logo} alt="kata chat app" style={{width: "150px", height: "auto"}} />
          <h3>{isRegister? "Sign Up" : "Sign In"}</h3>
          {
            isRegister
            ? (<SignUp/>)
            : (<Login/>)
          }
          {isRegister
            ? <span>
              <p>Already have an account? <b style={{cursor: "pointer"}} onClick={() => setIsRegister(!isRegister)}>Sign In</b></p>
              </span>
            : <span>
              <p>Don't have an account? <b style={{cursor: "pointer"}} onClick={() => setIsRegister(!isRegister)}>Sign Up</b></p>
              </span>}
        </div>
    </div>
  )
}

export default Auth