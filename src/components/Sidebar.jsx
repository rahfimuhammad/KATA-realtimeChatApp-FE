import React from 'react'
import Navbar from '../fragments/Navbar'
import ChatList from './ChatList'
import CreateConversation from './CreateConversation'
import { CaretRight, CaretLeft } from 'phosphor-react'
import { useApp } from '../context/AppProvider'

const Sidebar = () => {

  const { toggle, setToggle, isEditing } = useApp()

  return (
    <div className='sidebar-container' id={toggle? 'active-sidebar' : ''}>
        <Navbar/>
        {isEditing
        ? <CreateConversation/>
        : <ChatList/>}
        <div className='toggle-sidebar'
             onClick={() => setToggle(!toggle)}
             style={{
                      width: "50px",
                      height: "50px",
                      position: "absolute",
                      top: "calc(50% - 25px)",
                      borderRadius: "50%",
                      right: "-25px"
                    }}>
                      <CaretRight style={{position: "absolute", top: "calc(50% - 10px)", left: "calc(100% - 25px"}} size={20} color='white' />
                      <CaretLeft style={{position: "absolute", top: "calc(50% - 10px)", right: "calc(100% - 25px"}} size={20} color='white' />
                    </div>
    </div>
  )
}

export default Sidebar