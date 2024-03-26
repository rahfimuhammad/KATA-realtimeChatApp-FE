import React from 'react'
import { Plus, MagnifyingGlass } from 'phosphor-react'
import { useApp } from '../context/AppProvider'
import { useConversations } from '../context/ConversationsProvider'
import UserListItem from '../elements/UserListItem'

const ChatList = () => {

    const { setIsEditing } = useApp()
    const { conversations, setSelectedConversationId } = useConversations()

    const handleEdit = () => {
        setIsEditing(true)
        setSelectedConversationId(null)
    }

  return (
    <div className='sidebar-content'>
        <div className="search-input">
            <MagnifyingGlass size={20} />
            <input type="text" placeholder='Search' />
        </div>
        <div className="sidebar-content-header">
            <h4>Conversations</h4>
            <div className='btn-circle' onClick={handleEdit}>
                <Plus size={20} color='white'/>
            </div>
        </div>
        <div className="sidebar-content-list">
            {!conversations.length
            ? (<div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <span>
                    No conversation yet
                </span>
            </div>) 
            : conversations.map((conversation, index) => (
                <UserListItem key={index} conversation={conversation}/>
                ))
            }
        </div>
    </div>
  )
}

export default ChatList