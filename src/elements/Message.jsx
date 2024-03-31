import React, { useCallback } from 'react'
import MessageStatus from './MessageStatus'
import { TrashSimple } from 'phosphor-react'
import { useConversations } from '../context/ConversationsProvider'
import { formattedTime, getMessageDate, formattedTimeChatList } from '../function/useFormattedTime'
import { useApp } from '../context/AppProvider'
import Dummy from '../assets/dummy.png'

const Message = ({ deleteButton, lastMessage, message, index, avatar }) => {

    const { selectedConversation, deleteMessage } = useConversations()
    const { profile } = useApp()
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const handleDelete = (messageId) => {
        if (deleteButton) {
            deleteMessage(selectedConversation.recipients[0]?.id, messageId);
        }
    };

  return (
        <div className={`bubble-chat-wrapper ${message.fromMe? 'owner' : ''}`}  
            key={index} 
            ref= {lastMessage? setRef: null}>
                {(index === 0 || getMessageDate(message?.createdAt, selectedConversation.message[index - 1]?.createdAt)) &&
                <div className="message-day-container">
                    <span className="message-day">
                        <p style={{fontSize: "13px"}}>{formattedTimeChatList(message.createdAt)}</p>
                    </span>
                </div>}
                <div className="bubble-chat" style={{flexDirection: message.fromMe? 'row-reverse' : 'row'}}>
                    {(index === 0 
                    || message?.sender !== selectedConversation?.messages[index - 1]?.sender 
                    || getMessageDate(message?.createdAt, selectedConversation.message[index - 1]?.createdAt)) 
                    && <img className='message-profile-image' 
                            src={!message.fromMe? (avatar || Dummy) : profile?.avatarURL} 
                            alt="profile" 
                    />}
                    <div className={`message-container ${message.fromMe? 'me' : ''}`}>
                        <p>{message.text}</p>
                        <div className='time-container'>
                            <span style={{fontSize: '12px'}}>{formattedTime(message.createdAt)}</span>
                        </div>
                        {message.fromMe && <MessageStatus messageStatus={message?.status}/>}
                    </div>
                    {deleteButton &&
                    <button onClick={() => handleDelete(message?.messageId)}
                            className='delete-message-button'
                    >
                        <TrashSimple size={20} color="white" />
                    </button>
                    }
            </div>
        </div>
  )
}

export default Message