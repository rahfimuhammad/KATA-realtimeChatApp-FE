import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from '../elements/Login'
import SignUp from '../elements/SignUp'

const Auth = () => {

  const [isRegister, setIsRegister] = useState(false)

  return (
    <div 
      className='auth' 
      style={{width: "100%", 
              // height: "100%", 
              height: "100vh", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center"}}
    >
        <div className="auth-container">
          <img 
              src='/assets/logoAuth.png' 
              alt="kata chat app" 
              style={{width: "150px", 
                      height: "auto"}} 
          />
          <h3>
            {isRegister? "Sign Up" : "Sign In"}
          </h3>
          {
            isRegister
            ? (<SignUp setIsRegister={setIsRegister}/>)
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
        <ToastContainer/>
    </div>
  )
}

export default Auth