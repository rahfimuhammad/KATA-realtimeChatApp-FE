import React from 'react'
import { useConversations } from '../context/ConversationsProvider'
import { useApp } from '../context/AppProvider'

const ContactItem = ({ contact }) => {

  const { createConversation, setSelectedConversationId } = useConversations()
  const { setIsEditing, setToggle } = useApp()

  const startConversation = () => {
    
    createConversation([contact.recipientId])
    setSelectedConversationId(contact.recipientId)
    setIsEditing(false)
    setToggle(false)
  } 

  return (
    <div onClick={startConversation}
         className="contact-item" 
         style={{height: "50px",
                 padding: "5px 5px", 
                 borderBottom: "1px solid #cccccc", 
                 cursor: "pointer",
                 display: "flex", 
                 alignItems: "center", 
                 justifyContent: "space-between"}}>
        <div className="user-wrapper" 
             style={{display: 'flex', 
                     gap: "10px", 
                     alignItems: "center"}}>
            <img style={{width: "40px", 
                         height: "40px", 
                         borderRadius: "50%", 
                         objectFit: "cover"}}
                 src={contact?.recipient?.avatarURL} alt="profile" />
            <span>{contact?.recipient?.name}</span>
        </div>
    </div>
  )
}

export default ContactItem