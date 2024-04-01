import { Checks, Clock } from 'phosphor-react'
import React from 'react'

const MessageStatus = ({ messageStatus }) => {
  
    return (
    <div 
        style={{display: "flex", 
                alignItems: "flex-end"}}
    >
        {
            messageStatus === 'sending'
            ? (<Clock size={18}/>)
            : (<Checks size={18}/>)
        }
    </div>
  )
}

export default MessageStatus