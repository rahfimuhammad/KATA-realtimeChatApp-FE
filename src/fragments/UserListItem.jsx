import React from 'react'
import { useConversations } from '../context/ConversationsProvider'
import { useApp } from '../context/AppProvider'
import { formattedTimeChatList } from '../function/useFormattedTime'
import { useContacts } from '../context/ContactsProvider'
import Dummy from '../assets/dummy.png'

const UserListItem = ({ conversation }) => {

  const { setSelectedConversationId, selectedConversationId } = useConversations()
  const { setToggle, setIsEditing } = useApp()
  const lastMessage = conversation.message[conversation.message?.length - 1]?.text
  const timeMessage = formattedTimeChatList(conversation.message[conversation.message?.length - 1]?.createdAt)
  const { contacts } = useContacts()
  const contactData = contacts.find((contact) => {
    return contact?.recipientId === conversation?.recipients[0]?.id
  })
  const senderName = contactData?.recipient.name || conversation.recipients[0]?.id
  const profilePict = contactData?.recipient.avatarURL

  const selectConversation = (id) => {
    
    setSelectedConversationId(id)
    setIsEditing(false)
    setToggle(false)
  }

  return (
    <div className={`userlist-item ${selectedConversationId === conversation.recipients[0]?.id? "selected" : ""}`}
         onClick={() => selectConversation(conversation.recipients[0]?.id)}>
        <img className='profile-picture'
             src={profilePict || Dummy} 
             alt="profile-user" 
        />
        <div style={{height: "fit-content", width: "calc(100% - 60px)", display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-start"}}>
          <div style={{width: "100%", display: "flex", alignItems: "center"}}>
            <div style={{width: "50%"}}>
              <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                {senderName}
              </p>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
              <p style={{fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden"}}>
                {conversation?.message?.length? timeMessage : "Draft"}
              </p>
            </div>
          </div>
          <p style={{ maxWidth: "100%", fontSize: "14px", whiteSpace: "nowrap", overflowX: "hidden", textOverflow: "ellipsis", overflowWrap: "break-word" }}>
            {lastMessage?.length > 20? lastMessage.slice(0, 20) + '...' : lastMessage}
          </p>
        </div>
    </div>
  )
}

export default UserListItem