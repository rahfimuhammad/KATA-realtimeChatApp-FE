import React from 'react'

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
                    <img src='/assets/desktop.png' alt="bubble desktop" />
                    <img src='/assets/mobile.png' alt="bubble mobile" />
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