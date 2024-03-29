import React from 'react'
import { SignOut } from 'phosphor-react'
import Logo from '../assets/logo.png'
import { useApp } from '../context/AppProvider'

const Navbar = () => {

  const { setDialogueBox } = useApp()

  return (
    <div className='navbar-container'>
        <img src={Logo} alt="logo" style={{width: "30px", height: "auto"}} />
        <SignOut onClick={() => setDialogueBox(prevData => !prevData)}
                 style={{cursor: "pointer"}} size={30} color='white' />
    </div>
  )
}

export default Navbar