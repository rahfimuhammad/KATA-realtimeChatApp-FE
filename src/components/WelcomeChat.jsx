import React from 'react'
import Mobile from '../assets/desktop.png'
import Desktop from '../assets/mobile.png'

const WelcomeChat = () => {
  return (
    <div className='main-container'>
        <div 
          style={{width: "100%", 
                  height: "100%", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center"}}
        >
            <div className='welcome-container'>
                <div className='welcome-title'>
                  Welcome to Kata
                </div>
                <div className='welcome-image'>
                    <img src={Desktop} alt="bubble desktop" />
                    <img src={Mobile} alt="bubble mobile" />
                </div>
                <p className='welcome-message'>
                  Chat instantly on mobile or desktop
                </p>
                <button className='welcome-button'>
                  Download App
                </button>
            </div>
        </div>
    </div>
  )
}

export default WelcomeChat