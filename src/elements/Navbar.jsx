import React from 'react'
import { SignOut } from 'phosphor-react'
import { useApp } from '../context/AppProvider'

const Navbar = () => {

  const { setLogoutModal } = useApp()

  return (
    <div className='navbar-container'>
        <img 
            src='/assets/logo.png' 
            alt="logo" 
            style={{width: "30px", 
                    height: "auto"}}
        />
        <SignOut 
            onClick={() => setLogoutModal(prevData => !prevData)}
            style={{cursor: "pointer"}} 
            size={30} 
            color='white' 
        />
    </div>
  )
}

export default Navbar